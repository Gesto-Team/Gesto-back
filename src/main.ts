import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import configuration from './config/configuration';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://gesto.ovh.com/',
      'https://www.gesto.ovh/',
      'https://api.gesto.ovh.com/',
      'https://www.api.gesto.ovh/',
    ],
    credentials: true,
  });

  // Setting up swagger
  const config = new DocumentBuilder()
    .setTitle('My nest API')
    .setDescription('A full API implemented with NestJS framework.')
    .setVersion('1.0')
    .addTag('seed')
    .addTag('auth')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configuration().apiPort);
}
bootstrap();
