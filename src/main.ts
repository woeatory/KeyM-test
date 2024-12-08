import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/configuration';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  const logger: Logger = new Logger('MAIN');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Bookings API')
    .setDescription('The booking API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  const appConfig = configService.get<AppConfig>('app', { infer: true });
  const { port } = appConfig;
  await app.listen(port, () => {
    logger.log(`App listening on port ${port}`);
  });
}
bootstrap();
