import { Transport, TransportSchema } from './schemas/transport.schema';
import { MongooseModule } from '@nestjs/mongoose';

export const TransportForFeature = MongooseModule.forFeature([
  {
    name: Transport.name,
    schema: TransportSchema,
    collection: 'transport',
  },
]);
