import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Partner } from 'src/modules/backoffice/models/partner/partner.model';
import { PartnerPhotos } from 'src/modules/backoffice/models/partner/photos.model';

@Injectable()
export class PartnerPhotosService {
    constructor(@InjectModel('Partner') private readonly model: Model<Partner>) {}

    async create(username: string, data: PartnerPhotos): Promise<Partner> {
        const options = { upsert: true, new: true };
        return await this.model.findOneAndUpdate({ username }, {
            $push: {
                photos: data,
            }
        }, options);
    }

    async update(username: string, id: string, data: PartnerPhotos): Promise<Partner> {
        return await this.model.findOneAndUpdate({ username, 'photos._id': id }, { // active: true
            $set: {
                'photos.$': data,
            }
        });
    }
    
}
