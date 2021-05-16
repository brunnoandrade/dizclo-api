import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './backoffice/backoffice.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dizclouser:urq9aIOzjeQMRoFs@cluster0.zajxb.mongodb.net/myDbDizlo?retryWrites=true&w=majority'),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
