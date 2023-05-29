import { ConfigModule, ConfigService } from '@nestjs/config';
import { Keys } from 'core/enums/keys.enum';
import { BullModule } from '@nestjs/bull';

export const BullConfig = BullModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      redis: {
        host: configService.get<string>(Keys.REDIS_HOST),
        port: configService.get<number>(Keys.REDIS_PORT),
        password: configService.get<string>(Keys.REDIS_PASSWORD),
      },
      prefix: configService.get<string>(Keys.APP_NAME),
    };
  },
});
