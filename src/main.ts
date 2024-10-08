import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import configuration from './config/configuration';
import * as cookieParser from 'cookie-parser';
import { xss } from 'express-xss-sanitizer';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.use(xss());

  app.enableCors({
    origin: [configuration().clientUrl],
    credentials: true,
  });

  app.use(
    ['/api', '/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [configuration().swaggerUsername]: configuration().swaggerPassword,
      },
    }),
  );

  // Setting up swagger
  const config = new DocumentBuilder()
    .setTitle('My nest API')
    .setDescription('A full API implemented with NestJS framework.')
    .setVersion('1.0')
    .addTag('seed')
    .addTag('auth')
    .addTag('users')
    .addTag('companies')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configuration().apiPort);
}
bootstrap();
