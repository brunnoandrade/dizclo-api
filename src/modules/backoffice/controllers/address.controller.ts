import { Controller, Post, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

import { CreateAddressContract } from 'src/modules/backoffice/contracts/address/create-address.contract';

import { Result } from 'src/modules/backoffice/models/result.model';
import { Address } from 'src/modules/backoffice/models/address.model';

import { AddressService } from 'src/modules/backoffice/services/address.service';
import { AddressType } from 'src/modules/backoffice/enums/address-type.enum';

@Controller('v1/addresses')
export class AddressController {

    constructor(
        private readonly service: AddressService
    ) { }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.service.create(document, model, AddressType.Billing);
            return new Result(null, true, model, null)
        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu endereço!', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }

    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.service.create(document, model, AddressType.Shipping);
            return new Result(null, true, model, null)
        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu endereço!', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }

}
