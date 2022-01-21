import { Module, CacheModule, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';

import { CustomerSchema } from 'src/modules/backoffice/schemas/customer.schema';
import { PartnerSchema } from 'src/modules/backoffice/schemas/partner.schema';
import { UserSchema } from 'src/modules/backoffice/schemas/user.schema';

import { AccountService } from 'src/modules/backoffice/services/account.service';
import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { PartnerService } from 'src/modules/backoffice/services/partner/partner.service';
import { PartnerPhotoService } from 'src/modules/backoffice/services/partner/photo.service';
import { PartnerViewService } from 'src/modules/backoffice/services/partner/view.service';
import { AddressService } from 'src/modules/backoffice/services/address.service';
import { AuthService } from 'src/shared/services/auth.service';

import { AccountController } from 'src/modules/backoffice/controllers/account.controller';
import { CustomerController } from 'src/modules/backoffice/controllers/customer.controller';
import { PartnerController } from 'src/modules/backoffice/controllers/partner/partner.controller';
import { PartnerPhotoController } from 'src/modules/backoffice/controllers/partner/photo.controller';
import { PartnerViewController } from 'src/modules/backoffice/controllers/partner/view.controller';
import { AddressController } from 'src/modules/backoffice/controllers/address.controller';

@Module({
  imports: [
    HttpModule,
    CacheModule.register(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    MongooseModule.forFeature([
      {
        name: 'Customer',
        schema: CustomerSchema,
      },
      {
        name: 'Partner',
        schema: PartnerSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [
    AccountController,
    CustomerController,
    PartnerController,
    PartnerPhotoController,
    PartnerViewController,
    AddressController,
  ],
  providers: [
    AccountService,
    CustomerService,
    PartnerService,
    PartnerPhotoService,
    PartnerViewService,
    AddressService,
    AuthService,
    JwtStrategy,
  ],
})
export class BackofficeModule {}
