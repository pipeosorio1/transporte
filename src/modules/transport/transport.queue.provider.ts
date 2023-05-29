import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QueueEmum } from 'core/enums/queues.enum';
import { ConfigService } from '@nestjs/config';
import { QueueProvider } from 'core/provider/queue.provider';

@Injectable()
export class TransportQueueProvider extends QueueProvider {
  constructor(
    @InjectQueue(QueueEmum.TRANSPORT) protected readonly queue: Queue,
    protected readonly configService: ConfigService,
  ) {
    super(queue, configService);
  }
}
