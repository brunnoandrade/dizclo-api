import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { Address } from 'src/modules/backoffice/models/address.model';
import { Pet } from 'src/modules/backoffice/models/pet.model';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel('Customer') private readonly model: Model<Customer>
    ) { }

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save();
    }

    async addBillingAddress(document: string, data: Address): Promise<Customer> {
        const options = { upsert: true };
        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                billingAddress: data
            }
        }, options);
    }

    async addShippingAddress(document: string, data: Address): Promise<Customer> {
        const options = { upsert: true };
        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                shippingAddress: data
            }
        }, options);
    }

    async createPet(document: string, data: Pet): Promise<Customer> {
        const options = { upsert: true, new: true };
        return await this.model.findOneAndUpdate({ document }, {
            $push: {
                pets: data,
            }
        }, options);
    }

    async updatePet(document: string, id: string, data: Pet): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document, 'pets._id': id }, { // active: true
            $set: {
                'pets.$': data,
            }
        });
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
