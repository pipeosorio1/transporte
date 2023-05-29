import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Keys } from 'core/enums/keys.enum';

export const MongoDbConfig = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): MongooseModuleOptions => {
    const host = configService.get<string>(Keys.MONGO_HOST);
    const port = configService.get<string>(Keys.MONGO_PORT);
    return {
      uri: `mongodb://${host}:${port}/`,
      user: configService.get<string>(Keys.MONGO_USERNAME),
      pass: configService.get<string>(Keys.MONGO_PASSWORD),
      dbName: configService.get<string>(Keys.MONGO_DATABASE),
    };
  },
});
