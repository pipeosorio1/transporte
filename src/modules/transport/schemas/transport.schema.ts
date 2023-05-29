import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaConfig } from 'core/config/schema.config';
import { HydratedDocument, Types } from 'mongoose';

@Schema(SchemaConfig)
export class Transport {
  @Prop()
  driver_id: string;

  @Prop()
  rider_id: string;

  @Prop({ default: 1 })
  state: number;

  @Prop()
  latitude_initial: Types.Decimal128;

  @Prop()
  longitude_initial: Types.Decimal128;

  @Prop()
  latitude_final: Types.Decimal128;

  @Prop()
  longitude_final: Types.Decimal128;

  @Prop()
  km: number;

  @Prop()
  minute: number;

  @Prop()
  total: Types.Decimal128;

  @Prop()
  installments: number;

  @Prop({ default: 0 })
  paid: number;
}

export type TransportDocument = HydratedDocument<Transport>;

export const TransportSchema = SchemaFactory.createForClass(Transport);
