import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) {}

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save();
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
    
}
