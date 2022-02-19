import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { validationConfigs } from './pipe/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationConfigs()));
  app.enableCors();
  await app.listen(parseInt(process.env.PORT) || 3333, () => {
    console.log('🚀 Server started.');
  });
}
bootstrap();
