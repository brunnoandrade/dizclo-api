import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';

import { CustomerController } from './controllers/customer.controller';

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

})
export class BackofficeModule {}
