import { NestFactory } from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Prisma Xilank - NestJS Xilank Group')
    .setDescription('Building NestJS API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {customSiteTitle:'Prisma Xilank'});
    
  app.enableCors();
  await app.listen(3333);
}
bootstrap();
