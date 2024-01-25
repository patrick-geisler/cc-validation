import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidatorModule } from './validator/validator.module';

@Module({
  imports: [ValidatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
