import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {SwaggerModule , DocumentBuilder} from '@nestjs/swagger'
import { SwaggerConfig } from './config/SwaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes
  (
    new ValidationPipe
    ({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    })
  );

  const config = new DocumentBuilder().setTitle('Obadiet API').setDescription('API de fornecimento de dados para uma aplicação de individuos com doênças crônicas').setVersion('1.0').addTag('Obadiet').build();

  const options: SwaggerConfig =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
