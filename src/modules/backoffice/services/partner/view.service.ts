import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Partner } from 'src/modules/backoffice/models/partner/partner.model';
import { PartnerView } from 'src/modules/backoffice/models/partner/view';

@Injectable()
export class PartnerViewService {
  constructor(@InjectModel('Partner') private readonly model: Model<Partner>) {}

  async create(userName: string, data: PartnerView): Promise<Partner> {
    const options = { upsert: true, new: true };
    return await this.model.findOneAndUpdate(
      { userName },
      {
        $push: {
          views: data,
        },
      },
      options,
    );
  }

  async update(
    userName: string,
    id: string,
    data: PartnerView,
  ): Promise<Partner> {
    return await this.model.findOneAndUpdate(
      { userName, 'views._id': id },
      {
        // active: true
        $set: {
          'views.$': data,
        },
      },
    );
  }
}
