import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';

import { CustomerSchema } from 'src/modules/backoffice/schemas/customer.schema';
import { UserSchema } from 'src/modules/backoffice/schemas/user.schema';

import { AccountService } from 'src/modules/backoffice/services/account.service';
import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { AddressService } from 'src/modules/backoffice/services/address.service';
import { PetService } from 'src/modules/backoffice/services/pet.service';
import { AuthService } from 'src/shared/services/auth.service';

import { AccountController } from 'src/modules/backoffice/controllers/account.controller';
import { CustomerController } from 'src/modules/backoffice/controllers/customer.controller';
import { AddressController } from 'src/modules/backoffice/controllers/address.controller';
import { PetController } from 'src/modules/backoffice/controllers/pet.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: '#~Tp:}K7EFxkE;w#ZUNO-F#b<bmqXJM&7O}P9wakI-^N(ihHE*Ra{!XDk!*6)9-x4F.{?*9:<uduyJE)>20',
            signOptions: {
                expiresIn: 3600
            }
        }),
        MongooseModule.forFeature(
            [
                {
                    name: 'Customer',
                    schema: CustomerSchema,
                },
                {
                    name: 'User',
                    schema: UserSchema,
                },
            ]
        ),
    ],
    controllers: [AccountController, CustomerController, AddressController, PetController],
    providers: [AccountService, CustomerService, AddressService, PetService, AuthService, JwtStrategy]
})
export class BackofficeModule {}
