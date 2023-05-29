import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = (name: string) => {
  return new DocumentBuilder().setTitle(name.toUpperCase()).build();
};
