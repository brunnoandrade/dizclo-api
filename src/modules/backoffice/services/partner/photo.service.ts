import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Partner } from 'src/modules/backoffice/models/partner/partner.model';
import { PartnerPhoto } from 'src/modules/backoffice/models/partner/photo';

@Injectable()
export class PartnerPhotoService {
  constructor(@InjectModel('Partner') private readonly model: Model<Partner>) {}

  async create(username: string, data: PartnerPhoto): Promise<Partner> {
    const options = { upsert: true, new: true };
    return await this.model.findOneAndUpdate(
      { username },
      {
        $push: {
          photos: data,
        },
      },
      options,
    );
  }

  async update(
    username: string,
    id: string,
    data: PartnerPhoto,
  ): Promise<Partner> {
    return await this.model.findOneAndUpdate(
      { username, 'photos._id': id },
      {
        // active: true
        $set: {
          'photos.$': data,
        },
      },
    );
  }
}
