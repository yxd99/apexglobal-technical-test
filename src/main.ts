import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { envs } from '@app/infrastructure/config/envs';
import { AppModule } from '@app/app.module';
import * as swagger from '@app/infrastructure/config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  swagger.setup(app);
  
  await app.listen(envs.PORT, async () => {
    Logger.log(`Server is running on ${envs.PORT} port`);
  });
}

bootstrap();
