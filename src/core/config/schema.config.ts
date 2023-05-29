import { SchemaOptions } from '@nestjs/mongoose';

export const SchemaConfig: SchemaOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
};
