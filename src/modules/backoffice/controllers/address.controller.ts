import { Controller, Post, Param, Body, UseInterceptors, HttpException, HttpStatus, Get } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

import { CreateAddressContract } from 'src/modules/backoffice/contracts/address/create-address.contract';

import { Address } from 'src/modules/backoffice/models/address.model';

import { ResultDto } from 'src/modules/backoffice/dtos/result.dto';

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
            return new ResultDto(null, true, model, null)
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível adicionar seu endereço!', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }

    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.service.create(document, model, AddressType.Shipping);
            return new ResultDto(null, true, model, null)
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível adicionar seu endereço!', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }

    @Get('search/:zipcode')
    async search(@Param('zipcode') zipcode) {
        try {
            const response = await this.service.getAddressByZipCode(zipcode).toPromise();
            return new ResultDto(null, true, response.data, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível localizar seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

}
