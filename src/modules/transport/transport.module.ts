import { HttpModule } from '@nestjs/axios';
import { ConsoleLogger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransportRepository } from './repositories/transport.repository';
import { TransportController } from './transport.controller';
import { TransportQueue } from './queues/transport.queue';
import { TransportQueueProvider } from './transport.queue.provider';
import { TransportService } from './transport.service';
import { TransportTransactionService } from './transport-transaction.service';
import { TransportForFeature } from './transport.forfeature';
import { TransportRegisterConsumer } from './transport-register.consumer';
import { TransportModifyConsumer } from './transport-modify.consumer';
import { DriverModule } from 'modules/driver/driver.module';
import { RiderModule } from 'modules/rider/rider.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    TransportForFeature,
    TransportQueue,
    DriverModule,
    RiderModule,
  ],
  controllers: [TransportController],
  providers: [
    ConsoleLogger,
    TransportService,
    TransportTransactionService,
    TransportRepository,
    TransportRegisterConsumer,
    TransportModifyConsumer,
    TransportQueueProvider,
  ],
})
export class TransportModule {}
