import { validationConfig } from 'core/config/validation.config';
import { swaggerConfig } from 'core/config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Keys } from 'core/enums/keys.enum';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const name = configService.get<string>(Keys.APP_NAME);

  const port = configService.get<number>(Keys.APP_PORT);

  const config = swaggerConfig(name);

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(validationConfig);

  app.enableCors({ origin: '*' });

  await app.listen(port);
}

bootstrap();
