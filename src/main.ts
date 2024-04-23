import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import configuration from './config/configuration';
import * as cookieParser from 'cookie-parser';
import { xss } from 'express-xss-sanitizer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.use(xss());

  console.log(configuration().clientUrl);

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:5173',
      'http://gesto.ovh/',
      'http://www.gesto.ovh/',
      'http://api.gesto.ovh/',
      'http://www.api.gesto.ovh/',
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
