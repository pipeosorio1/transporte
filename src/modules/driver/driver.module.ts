import { DriverRepository } from './repositories/driver.repository';
import { DriverForFeature } from './driver.forfeature';
import { ConsoleLogger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

@Module({
  imports: [ConfigModule, DriverForFeature],
  providers: [ConsoleLogger, DriverRepository, DriverService],
  controllers: [DriverController],
  exports: [DriverRepository],
})
export class DriverModule {}
