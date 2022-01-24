import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Partner } from 'src/modules/backoffice/models/partner/partner.model';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';
import { UpdatePartnerDto } from 'src/modules/backoffice/dtos/partner/update-partner.dto';

@Injectable()
export class PartnerService {
  constructor(@InjectModel('Partner') private readonly model: Model<Partner>) {}

  async create(data: Partner): Promise<Partner> {
    const partner = new this.model(data);
    return await partner.save();
  }

  async update(userName: string, data: UpdatePartnerDto): Promise<Partner> {
    return await this.model.findOneAndUpdate({ userName }, data);
  }

  async findAll(): Promise<Partner[]> {
    return await this.model
      .find({}, 'name userName email photos views')
      .sort('name')
      .exec();
  }

  async find(userName): Promise<Partner[]> {
    return await this.model
      .find({ userName })
      .populate('user', 'userName')
      .exec();
  }

  async query(model: QueryDto): Promise<Partner[]> {
    return await this.model
      .find(model.query, model.fields, {
        skip: model.skip,
        limit: model.take,
      })
      .sort(model.sort)
      .exec();
  }
}
