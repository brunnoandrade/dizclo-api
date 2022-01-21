import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Partner } from 'src/modules/backoffice/models/partner/partner.model';
import { PartnerTestmonial } from 'src/modules/backoffice/models/partner/testmonial';

@Injectable()
export class PartnerTestmonialService {
  constructor(@InjectModel('Partner') private readonly model: Model<Partner>) {}

  async create(username: string, data: PartnerTestmonial): Promise<Partner> {
    const options = { upsert: true, new: true };
    return await this.model.findOneAndUpdate(
      { username },
      {
        $push: {
          testmonials: data,
        },
      },
      options,
    );
  }

  async update(
    username: string,
    id: string,
    data: PartnerTestmonial,
  ): Promise<Partner> {
    return await this.model.findOneAndUpdate(
      { username, 'testmonials._id': id },
      {
        // active: true
        $set: {
          'testmonials.$': data,
        },
      },
    );
  }
}
