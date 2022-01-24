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

  async update(username: string, data: UpdateCustomerDto): Promise<Customer> {
    return await this.model.findOneAndUpdate({ username }, data);
  }

  async findAll(): Promise<Customer[]> {
    return await this.model
      .find({}, 'fullName document birthday gender email phoneNumber') //'-name'
      .sort('fullName') //'-name' decrescente
      .exec();
  }

  async find(username): Promise<Customer[]> {
    return await this.model
      .find({ username }, '-__v') // .find({ username }, 'name email username')
      .populate('user', 'username')
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
    username: string,
    data: CreditCard,
  ): Promise<Customer> {
    const options = { upsert: true };
    return await this.model.findOneAndUpdate(
      { username },
      {
        $set: {
          card: data,
        },
      },
      options,
    );
  }
}
