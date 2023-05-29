import { Driver, DriverSchema } from './schemas/driver.schema';
import { MongooseModule } from '@nestjs/mongoose';

export const DriverForFeature = MongooseModule.forFeature([
  {
    name: Driver.name,
    schema: DriverSchema,
    collection: 'driver',
  },
]);
