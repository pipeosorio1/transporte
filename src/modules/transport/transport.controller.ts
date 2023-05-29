import { TransportRepository } from './repositories/transport.repository';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { TransportStoreDto } from './dtos/transport-store.dto';
import { TransportIndexDto } from './dtos/transport-index.dto';
import { TransportModifyDto } from './dtos/transport-modify.dto';
import { QueueEmum } from 'core/enums/queues.enum';
import { JobConfig } from 'core/config/job.config';
import { JobEmum } from 'core/enums/job.enum';
import { InjectQueue } from '@nestjs/bull';
import { ApiTags } from '@nestjs/swagger';
import { Queue } from 'bull';
import { v4 as uuid } from 'uuid';
import { RiderIndexDto } from 'modules/rider/dtos/riderindex.dto';
import { DriverRepository } from 'modules/driver/repositories/driver.repository';
import { RiderRepository } from 'modules/rider/repositories/rider.repository';

@ApiTags('Transport')
@Controller({ path: 'api/transport' })
export class TransportController {
  constructor(
    @InjectQueue(QueueEmum.TRANSPORT) private readonly queue: Queue,
    private readonly repository: TransportRepository,
    private readonly repositoryDriver: DriverRepository,
    private readonly riderRepository: RiderRepository,
  ) {}

  @Post()
  public async store(@Body() body: TransportStoreDto): Promise<any> {
    const opts = JobConfig;
    opts.jobId = uuid();

    const dataRider: RiderIndexDto = { user_id: body.user_id };
    const rider = await this.riderRepository.getByUserId(dataRider);

    if (!rider) {
      throw new HttpException(
        { status: 'ERROR', message: 'username not found in database' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const dataRepository: TransportIndexDto = { rider_id: rider.id };
    const transport = await this.repository.getByRiderIdAndAsset(
      dataRepository,
    );

    if (transport !== null) {
      throw new HttpException(
        { status: 'ERROR', message: 'the user has an active transport' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const driver = await this.repositoryDriver.getByAvailable();

    if (!driver) {
      throw new HttpException(
        { status: 'ERROR', message: 'no available drivers found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.queue.add(JobEmum.TRANSPORT_REGISTER, body, opts);

    return { status: 'CREATED' };
  }

  @Put()
  public async modify(@Body() body: TransportModifyDto): Promise<any> {
    const opts = JobConfig;
    opts.jobId = uuid();

    const dataRider: RiderIndexDto = { user_id: body.user_id };
    const rider = await this.riderRepository.getByUserId(dataRider);

    if (!rider) {
      throw new HttpException(
        { status: 'ERROR', message: 'username not found in database' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const dataRepository: TransportIndexDto = { rider_id: rider.id };
    const transport = await this.repository.getByRiderIdAndAsset(
      dataRepository,
    );

    if (transport === null) {
      throw new HttpException(
        { status: 'ERROR', message: 'transaction has already been paid' },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.queue.add(JobEmum.TRANSPORT_MODIFY, body, opts);

    return { status: 'MODIFY' };
  }
}
