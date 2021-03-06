import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { CreditCard } from 'src/modules/backoffice/models/credit-card.model';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';
import { UpdateCustomerDto } from 'src/modules/backoffice/dtos/customer/update-customer.dto';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) {}

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save();
    }

    async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document }, data);
    }

    async findAll(): Promise<Customer[]> {
        return await this.model
            .find({}, 'name email document') //'-name'
            .sort('name') //'-name' decrescente
            .exec();
    }

    async find(document): Promise<Customer[]> {
        return await this.model
            .find({ document }) // .find({ document }, 'name email document')
            .populate('user', 'username')
            .exec();
    }

    async query(model: QueryDto): Promise<Customer[]> {
        return await this.model
            .find(
                model.query,
                model.fields,
                {
                    skip: model.skip,
                    limit: model.take
                })
            .sort(model.sort)
            .exec();
    }

    async saveOrUpdateCreditCard(document: string, data: CreditCard): Promise<Customer> {
        const options = { upsert: true };
        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                card: data,
            },
        }, options);
    }
    
}
