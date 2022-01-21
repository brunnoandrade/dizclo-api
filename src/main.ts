import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { CustomLogger } from 'src/shared/services/custom-logger.service';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  app.use(compression());

  // Open API (Swagger)
  const options = new DocumentBuilder()
    .setTitle('Dizclo API')
    .setDescription('API da plataforma Dizclo')
    .setVersion('1.0.0')
    .addTag('app')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT;
  await app.listen(port);
}
bootstrap();
