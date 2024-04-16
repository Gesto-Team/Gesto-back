import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import configuration from './config/configuration';
// const { xss } = require('express-xss-sanitizer');
import * as cors from 'cors';
// Protect against XSS attacks, should come before any routes

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  app.use(helmet());
  // app.use(xss());
  app.useGlobalPipes(new ValidationPipe());

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
