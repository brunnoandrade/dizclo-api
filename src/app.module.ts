import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dizclouser:urq9aIOzjeQMRoFs@cluster0.zajxb.mongodb.net/dizclodb?retryWrites=true&w=majority'),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
