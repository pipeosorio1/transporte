import { RiderForFeature } from './rider.forfeature';
import { ConsoleLogger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RiderRepository } from './repositories/rider.repository';
import { RiderController } from './rider.controller';
import { RiderService } from './rider.service';

@Module({
  imports: [ConfigModule, RiderForFeature],
  providers: [ConsoleLogger, RiderRepository, RiderService],
  controllers: [RiderController],
  exports: [RiderRepository],
})
export class RiderModule {}
