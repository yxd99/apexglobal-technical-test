import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { envs } from '@infrastructure/config/envs';
import { AppModule } from '@app/app.module';
import * as swagger from '@infrastructure/config/swagger';
import * as apiInfo from '@infrastructure/config/api-info';
import { ErrorInterceptor } from '@infrastructure/interceptors/error.interceptor';
import { ResponseInterceptor } from '@infrastructure/interceptors/response.interceptor';

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
  app.setGlobalPrefix(apiInfo.PREFIX);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ErrorInterceptor());
  
  await app.listen(envs.PORT, async () => {
    Logger.log(`Server is running on ${envs.PORT} port`);
  });
}

bootstrap();
