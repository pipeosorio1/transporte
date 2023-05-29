import { Queue } from 'bull';
import { ConfigService } from '@nestjs/config';
import { Keys } from 'core/enums/keys.enum';

export class QueueProvider {
  constructor(
    protected readonly queue: Queue,
    protected readonly configService: ConfigService,
  ) {
    this.initializeMetaHash();
  }

  protected async initializeMetaHash(): Promise<void> {
    const prefix = this.configService.get<string>(Keys.APP_NAME);
    const metaKey = `${prefix}:${this.queue.name}:meta`;
    const exists = await this.queue.client.exists(metaKey);

    // Si el hash "meta" no existe, créalo
    if (!exists) {
      const metaValue = { 'opts.maxLenEvents': 10000 };
      await this.queue.client.hmset(metaKey, metaValue);
    }
  }
}
