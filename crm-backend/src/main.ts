import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/api.module';
import * as tracer from 'cls-rtracer';
import { randomUUID } from 'crypto';
import { LoggerService } from './core/services/loggerService/logger.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONSTANTS } from './constants';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './core/services/loggerService/logger.intercepter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: false,
    logger: new LoggerService(),
  });

  app.use(
    tracer.expressMiddleware({
      useHeader: true,
      requestIdFactory: () => randomUUID(),
    }),
  );
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const loggerService = app.get(LoggerService);
  app.useGlobalInterceptors(new LoggerInterceptor(loggerService));

  const config = new DocumentBuilder()
    .setTitle(SWAGGER_CONSTANTS.title)
    .setDescription(SWAGGER_CONSTANTS.description)
    .setVersion(SWAGGER_CONSTANTS.version)
    .addTag(SWAGGER_CONSTANTS.tag)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  if (app) {
    await app.listen(process.env.PORT!);
    Logger.log('App Started on Port: ' + process.env.PORT);
  }
}
bootstrap();
