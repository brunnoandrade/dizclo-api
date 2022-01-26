import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
  CacheInterceptor,
} from '@nestjs/common';
import { Md5 } from 'md5-typescript';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

import { CreateCustomerContract } from 'src/modules/backoffice/contracts/customer/create-customer.contract';
import { UpdateCustomerContract } from 'src/modules/backoffice/contracts/customer/update-customer.contract';
import { QueryContract } from 'src/modules/backoffice/contracts/query.contract';

import { User } from 'src/modules/backoffice/models/user.model';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { ResultDto } from 'src/modules/backoffice/dtos/result.dto';

import { CreateCustomerDto } from 'src/modules/backoffice/dtos/customer/create-customer.dto';
import { UpdateCustomerDto } from 'src/modules/backoffice/dtos/customer/update-customer.dto';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';

import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { AccountService } from 'src/modules/backoffice/services/account.service';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly accountService: AccountService,
  ) {}

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto) {
    try {
      const password = await Md5.init(
        `${model.password}${process.env.SALT_KEY}`,
      );
      const user = await this.accountService.create(
        new User(model.email, model.document, model.userName, password, true, [
          'customer',
        ]),
      );
      const customer = new Customer(
        model.userName,
        model.fullName,
        model.birthday,
        model.gender,
        model.phoneNumber,
        model.document,
        model.email,
        user,
      );
      await this.customerService.create(customer);
      return new ResultDto(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível realizar seu cadastro',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':userName')
  @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
  async update(@Param('userName') userName, @Body() model: UpdateCustomerDto) {
    try {
      await this.customerService.update(userName, model);
      return new ResultDto(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível atualizar seus dados',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAll() {
    const data = await this.customerService.findAll();
    return new ResultDto(null, true, data, null);
  }

  @Get(':userName')
  async get(@Param('userName') userName) {
    const data = await this.customerService.find(userName);
    return new ResultDto(null, true, data, null);
  }

  @Post('query')
  @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
  async query(@Body() model: QueryDto) {
    const data = await this.customerService.query(model);
    return new ResultDto(null, true, data, null);
  }
}
