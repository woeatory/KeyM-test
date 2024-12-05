import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/configuration';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger: Logger = new Logger('MAIN');

  const appConfig = configService.get<AppConfig>('app', { infer: true });
  const { port } = appConfig;
  await app.listen(port, () => {
    logger.log(`App listening on port ${port}`);
  });
}
bootstrap();
