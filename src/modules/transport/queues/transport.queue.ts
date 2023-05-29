import { QueueEmum } from 'core/enums/queues.enum';
import { BullModule } from '@nestjs/bull';

export const TransportQueue = BullModule.registerQueue({
  name: QueueEmum.TRANSPORT,
});
