import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from '@infrastructure/database/mongo/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
