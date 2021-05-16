import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './backoffice/backoffice.module';

@Module({
  imports: [
    MongooseModule.forRoot('CONNECTION_STRING'),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
