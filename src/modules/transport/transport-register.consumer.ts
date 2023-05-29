import { TransportStoreDto } from './dtos/transport-store.dto';
import { TransportService } from './transport.service';
import { QueueEmum } from 'core/enums/queues.enum';
import { ConsoleLogger } from '@nestjs/common';
import { JobEmum } from 'core/enums/job.enum';
import { Job } from 'bull';
import {
  Processor,
  Process,
  OnQueueCompleted,
  OnQueueFailed,
} from '@nestjs/bull';

@Processor(QueueEmum.TRANSPORT)
export class TransportRegisterConsumer {
  constructor(
    private readonly service: TransportService,
    private readonly logger: ConsoleLogger,
  ) {}

  @Process(JobEmum.TRANSPORT_REGISTER)
  async register(job: Job<TransportStoreDto>) {
    await this.service.register(job.data);
  }

  @OnQueueCompleted()
  async onQueueCompleted(job: Job<TransportStoreDto[]>) {
    const message = `El job ${job.name} con ID ${job.id} ha ejecutado correctamente.`;

    this.logger.log(message);
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job<TransportStoreDto[]>, error: Error) {
    const message = `El job ${job.name} con ID ${job.id} ha fallado, causa: ${error.message}`;

    this.logger.log(message);
  }
}
