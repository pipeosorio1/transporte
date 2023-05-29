import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaConfig } from 'core/config/schema.config';
import { HydratedDocument } from 'mongoose';

@Schema(SchemaConfig)
export class Driver {
  @Prop()
  name: string;

  @Prop()
  vehicle_plate: string;

  @Prop()
  available: number;
}

export type DriverDocument = HydratedDocument<Driver>;

export const DriverSchema = SchemaFactory.createForClass(Driver);
