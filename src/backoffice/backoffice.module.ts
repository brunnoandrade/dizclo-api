import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';

import { CustomerController } from './controllers/customer.controller';

import { AccountService } from './services/account.service';
import { CustomerService } from './services/customer.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Customer',
                schema: CustomerSchema,
            },
            {
                name: 'User',
                schema: UserSchema,
            },
        ]),
    ],
    controllers: [CustomerController],
    providers: [AccountService, CustomerService]
})
export class BackofficeModule {}
