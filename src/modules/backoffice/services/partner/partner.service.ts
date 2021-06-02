import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Partner } from 'src/modules/backoffice/models/partner/partner.model';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';
import { UpdatePartnerDto } from 'src/modules/backoffice/dtos/partner/update-partner.dto'

@Injectable()
export class PartnerService {
    constructor(@InjectModel('Partner') private readonly model: Model<Partner>) {}

    async create(data: Partner): Promise<Partner> {
        const partner = new this.model(data);
        return await partner.save();
    }

    async update(username: string, data: UpdatePartnerDto): Promise<Partner> {
        return await this.model.findOneAndUpdate({ username }, data);
    }

    async findAll(): Promise<Partner[]> {
        return await this.model
            .find({}, 'name username email photos')
            .sort('name')
            .exec();
    }

    async find(username): Promise<Partner[]> {
        return await this.model
            .find({ username })
            .populate('user', 'username')
            .exec();
    }

    async query(model: QueryDto): Promise<Partner[]> {
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
