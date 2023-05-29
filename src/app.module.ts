import { TransportModule } from 'modules/transport/transport.module';
import { MongoDbConfig } from 'core/config/mongodb.config';
import { LoadConfig } from 'core/config/load.config';
import { BullConfig } from 'core/config/bull.config';
import { Module } from '@nestjs/common';
import { DriverModule } from 'modules/driver/driver.module';
import { RiderModule } from 'modules/rider/rider.module';

@Module({
  imports: [
    LoadConfig,
    BullConfig,
    MongoDbConfig,
    TransportModule,
    DriverModule,
    RiderModule,
  ],
})
export class AppModule {}
