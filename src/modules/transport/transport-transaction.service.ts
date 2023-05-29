import { HttpService } from '@nestjs/axios';
import { ConflictException, ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { Keys } from 'core/enums/keys.enum';
import { DriverRepository } from 'modules/driver/repositories/driver.repository';
import { RiderRepository } from 'modules/rider/repositories/rider.repository';

@Injectable()
export class TransportTransactionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly logger: ConsoleLogger,
    private readonly repositoryDriver: DriverRepository,
    private readonly riderRepository: RiderRepository,
  ) {}

  async pay(transport): Promise<void> {
    try {
      const {
        rider_id: riderId,
        driver_id: driverId,
        installments,
        total,
        id: transactionId,
      } = transport;
      const driver = await this.repositoryDriver.findById(driverId);
      driver.available = 1;
      driver.save();

      const rider = await this.riderRepository.findById(riderId);

      const api = this.configService.get<string>(Keys.API_PAGO);
      const tokenPub = this.configService.get<string>(Keys.TOKEN_PUB_PAGO);

      const urlMerchants = `${api}/merchants/${tokenPub}`;
      const resposeMerchants = await this.httpService.axiosRef.get(
        urlMerchants,
      );
      const {
        data: {
          presigned_acceptance: { acceptance_token: acceptanceToken },
        },
      } = resposeMerchants['data'];

      const urlTransactions = `${api}/transactions`;
      const headers = {
        Authorization: `Bearer ${tokenPub}`,
      };
      const data = {
        acceptance_token: acceptanceToken,
        payment_method: {
          type: 'CARD',
          installments: installments, // Número de cuotas
          token: rider.token_card, // Token de la tarjeta de crédito
        },
        amount_in_cents: total * 100,
        reference: transactionId,
        currency: 'COP',
        customer_email: rider.email,
      };
      await this.httpService.axiosRef.post(urlTransactions, data, { headers });
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(error.response.data);
        throw new ConflictException(error.response.data);
      }
      this.logger.error(error);
      throw new ConflictException(error);
    }
  }
}
