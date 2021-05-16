import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';

@Module({
    controllers: [CustomerController]
})
export class BackofficeModule {}
