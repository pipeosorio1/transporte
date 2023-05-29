import { TransportModifyDto } from './dtos/transport-modify.dto';
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
export class TransportModifyConsumer {
  constructor(
    private readonly service: TransportService,
    private readonly logger: ConsoleLogger,
  ) {}

  @Process(JobEmum.TRANSPORT_MODIFY)
  async register(job: Job<TransportModifyDto>) {
    await this.service.modify(job.data);
  }

  @OnQueueCompleted()
  async onQueueCompleted(job: Job<TransportModifyDto>) {
    const message = `El job ${job.name} con ID ${job.id} ha ejecutado correctamente.`;

    this.logger.log(message);
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job<TransportModifyDto>, error: Error) {
    const message = `El job ${job.name} con ID ${job.id} ha fallado, causa: ${error.message}`;

    this.logger.log(message);
  }
}
