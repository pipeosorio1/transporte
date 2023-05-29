import { TransportStoreDto } from './dtos/transport-store.dto';
import { TransportModifyDto } from './dtos/transport-modify.dto';
import { Transport } from './schemas/transport.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TransportRepository } from './repositories/transport.repository';
import { TransportTransactionService } from './transport-transaction.service';
import { DriverRepository } from 'modules/driver/repositories/driver.repository';
import { RiderRepository } from 'modules/rider/repositories/rider.repository';
import { RiderIndexDto } from 'modules/rider/dtos/riderindex.dto';
import { TransportIndexDto } from './dtos/transport-index.dto';

@Injectable()
export class TransportService {
  constructor(
    @InjectModel(Transport.name) private transport: Model<Transport>,
    private readonly repository: TransportRepository,
    private readonly serviceTransaction: TransportTransactionService,
    private readonly repositoryDriver: DriverRepository,
    private readonly riderRepository: RiderRepository,
  ) {}

  async register(data: TransportStoreDto): Promise<Transport[]> {
    const { user_id: userId } = data;

    const driver = await this.repositoryDriver.getByAvailable();
    driver.available = 0;
    driver.save();

    const dataRider: RiderIndexDto = { user_id: userId };
    const rider = await this.riderRepository.getByUserId(dataRider);

    const dataTransports = {
      driver_id: driver.id,
      rider_id: rider.id,
      ...data,
    };
    delete dataTransports.user_id;

    const transport = await this.transport.create([dataTransports]);

    return transport;
  }

  async modify(data: TransportModifyDto): Promise<Transport[]> {
    const { user_id: userId } = data;
    const dataRider: RiderIndexDto = { user_id: userId };
    const rider = await this.riderRepository.getByUserId(dataRider);

    const dataRepository: TransportIndexDto = { rider_id: rider.id };
    const transport = await this.repository.getByRiderIdAndAsset(
      dataRepository,
    );

    const {
      latitude_final: latitudeFinal,
      longitude_final: longitudeFinal,
      minute,
      km,
    } = data;

    const totalKm = km * 1000;
    const totalMinute = minute * 1000;
    const total = 3500 + totalMinute + totalKm;

    transport.latitude_final = latitudeFinal;
    transport.longitude_final = longitudeFinal;
    transport.km = km;
    transport.minute = minute;
    transport.state = 0;
    transport.total = total;

    await this.serviceTransaction.pay(transport);
    transport.paid = 1;
    transport.save();

    return transport;
  }
}
