import { Controller, Delete, Get, Post, Put, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

import { CreateCustomerContract } from 'src/modules/backoffice/contracts/customer/create-customer.contract';
import { CreateAddressContract } from 'src/modules/backoffice/contracts/customer/create-address.contract';
import { CreatePetContract } from 'src/modules/backoffice/contracts/customer/create-pet.contract';
import { QueryContract } from 'src/modules/backoffice/contracts/query.contract';

import { Result } from 'src/modules/backoffice/models/result.model';
import { User } from 'src/modules/backoffice/models/user.model';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { Address } from 'src/modules/backoffice/models/address.model';
import { Pet } from 'src/modules/backoffice/models/pet.model';

import { CreateCustomerDto } from 'src/modules/backoffice/dtos/create-customer.dto';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';

import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { AccountService } from 'src/modules/backoffice/services/account.service';

// localhost:3000/v1/customers
@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService) {
        
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        try {
            const user = await this.accountService.create(
                new User(model.document, model.password, true, [])
            );
            const customer = new Customer(model.name, model.document, model.email, [], null, null, null, user)
            const res = await this.customerService.create(customer)

            return new Result('Cliente criado com sucesso!', true, res, null)
        } catch (error) {
            throw new HttpException(new Result('Não foi possível realizar o seu cadastro!', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }

    @Post(':document/addresses/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.customerService.addBillingAddress(document, model);
            return new Result(null, true, model, null)
        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu endereço!', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }

    @Post(':document/addresses/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.customerService.addShippingAddress(document, model);
            return new Result(null, true, model, null)
        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu endereço!', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }

    @Post(':document/pets')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async createPet(@Param('document') document, @Body() model: Pet) {
        try {
            await this.customerService.createPet(document, model);
            return new Result(null, true, model, null)
        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu pet!', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }

    @Put(':document/pets/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async updatePet(@Param('document') document, @Param('id') id, @Body() model: Pet) {
        try {
            await this.customerService.updatePet(document, id, model);
            return new Result(null, true, model, null)
        } catch (error) {
            throw new HttpException(new Result('Não foi possível atualizar seu pet!', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }

    @Get()
    async getAll() {
        const customers = await this.customerService.findAll();
        return new Result(null, true, customers, null)
    }

    @Get(':document')
    async get(@Param('document') document) {
        const customer = await this.customerService.find(document);
        return new Result(null, true, customer, null)
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto) {
        const customers = await this.customerService.query(model);
        return new Result(null, true, customers, null);
    }

}