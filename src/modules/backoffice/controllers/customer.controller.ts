import { Controller, Get, Post, Put, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

import { CreateCustomerContract } from 'src/modules/backoffice/contracts/customer/create-customer.contract';
import { UpdateCustomerContract } from '../contracts/customer/update-customer.contract';
import { QueryContract } from 'src/modules/backoffice/contracts/query.contract';

import { Result } from 'src/modules/backoffice/models/result.model';
import { User } from 'src/modules/backoffice/models/user.model';
import { Customer } from 'src/modules/backoffice/models/customer.model';

import { CreateCustomerDto } from 'src/modules/backoffice/dtos/customer/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';

import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { AccountService } from 'src/modules/backoffice/services/account.service';

@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService
    ) { }

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

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async update(@Param('document') document, @Body() model: UpdateCustomerDto) {
        try {
            await this.customerService.update(document, model);
            return new Result(null, true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível atualizar seus dados', false, null, error), HttpStatus.BAD_REQUEST);
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
