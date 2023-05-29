import { Rider, RiderSchema } from './schemas/rider.schema';
import { MongooseModule } from '@nestjs/mongoose';

export const RiderForFeature = MongooseModule.forFeature([
  {
    name: Rider.name,
    schema: RiderSchema,
    collection: 'rider',
  },
]);
