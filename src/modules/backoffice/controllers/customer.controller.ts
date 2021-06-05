import { Controller, Get, Post, Put, Param, Body, UseInterceptors, HttpException, HttpStatus, CacheInterceptor } from '@nestjs/common';
import { Md5 } from "md5-typescript";
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

import { CreateCustomerContract } from 'src/modules/backoffice/contracts/customer/create-customer.contract';
import { UpdateCustomerContract } from 'src/modules/backoffice/contracts/customer/update-customer.contract';
import { CreateCreditCardContract } from 'src/modules/backoffice/contracts/customer/create-credit-card.contract';
import { QueryContract } from 'src/modules/backoffice/contracts/query.contract';

import { User } from 'src/modules/backoffice/models/user.model';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { CreditCard } from 'src/modules/backoffice/models/credit-card.model';
import { ResultDto } from "src/modules/backoffice/dtos/result.dto";

import { CreateCustomerDto } from 'src/modules/backoffice/dtos/customer/create-customer.dto';
import { UpdateCustomerDto } from 'src/modules/backoffice/dtos/customer/update-customer.dto';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';

import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { AccountService } from 'src/modules/backoffice/services/account.service';

@Controller('v1/customers')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly accountService: AccountService
    ) { }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        try {
            const password = await Md5.init(`${model.password}${process.env.SALT_KEY}`);
            const user = await this.accountService.create(new User(model.username, password, true, ['user']));
            const customer = new Customer(model.name, model.username, model.email, null, null, null, user);
            await this.customerService.create(customer);
            return new ResultDto(null, true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':username')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async update(@Param('username') username, @Body() model: UpdateCustomerDto) {
        try {
            await this.customerService.update(username, model);
            return new ResultDto(null, true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível atualizar seus dados', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    @UseInterceptors(CacheInterceptor)
    async getAll() {
        const customers = await this.customerService.findAll();
        return new ResultDto(null, true, customers, null);
    }

    @Get(':username')
    async get(@Param('username') username) {
        const customer = await this.customerService.find(username);
        return new ResultDto(null, true, customer, null);
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto) {
        const customers = await this.customerService.query(model);
        return new ResultDto(null, true, customers, null);
    }

    @Post(':username/credit-cards')
    @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
    async createBilling(@Param('username') username, @Body() model: CreditCard) {
        try {
            await this.customerService.saveOrUpdateCreditCard(username, model);
            return new ResultDto(null, true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível adicionar seu cartão de crédito', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
