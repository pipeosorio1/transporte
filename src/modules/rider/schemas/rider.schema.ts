import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaConfig } from 'core/config/schema.config';
import { HydratedDocument } from 'mongoose';

@Schema(SchemaConfig)
export class Rider {
  @Prop()
  user_id: number;

  @Prop()
  token_card: string;

  @Prop()
  email: string;
}

export type RiderDocument = HydratedDocument<Rider>;

export const RiderSchema = SchemaFactory.createForClass(Rider);
