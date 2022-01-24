import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { CreditCard } from 'src/modules/backoffice/models/credit-card.model';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';
import { UpdateCustomerDto } from 'src/modules/backoffice/dtos/customer/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<Customer>,
  ) {}

  async create(data: Customer): Promise<Customer> {
    const customer = new this.model(data);
    return await customer.save();
  }

  async update(userName: string, data: UpdateCustomerDto): Promise<Customer> {
    return await this.model.findOneAndUpdate({ userName }, data);
  }

  async findAll(): Promise<Customer[]> {
    return await this.model
      .find({}, 'fullName document birthday gender email phoneNumber') //'-name'
      .sort('fullName') //'-name' decrescente
      .exec();
  }

  async find(userName): Promise<Customer[]> {
    return await this.model
      .find({ userName }, '-__v') // .find({ userName }, 'name email userName')
      .populate('user', 'userName')
      .exec();
  }

  async query(model: QueryDto): Promise<Customer[]> {
    return await this.model
      .find(model.query, model.fields, {
        skip: model.skip,
        limit: model.take,
      })
      .sort(model.sort)
      .exec();
  }

  async saveOrUpdateCreditCard(
    userName: string,
    data: CreditCard,
  ): Promise<Customer> {
    const options = { upsert: true };
    return await this.model.findOneAndUpdate(
      { userName },
      {
        $set: {
          card: data,
        },
      },
      options,
    );
  }
}
