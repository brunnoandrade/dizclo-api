import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel('Customer') private readonly customerModel: Model<Customer>
    ) { }

    async create(data: Customer): Promise<Customer> {
        const customer = new this.customerModel(data);
        return await customer.save();
    }
}
