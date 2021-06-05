import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Partner } from 'src/modules/backoffice/models/partner/partner.model';
import { PartnerView } from 'src/modules/backoffice/models/partner/view';

@Injectable()
export class PartnerViewService {
    constructor(@InjectModel('Partner') private readonly model: Model<Partner>) {}

    async create(username: string, data: PartnerView): Promise<Partner> {
        const options = { upsert: true, new: true };
        return await this.model.findOneAndUpdate({ username }, {
            $push: {
                views: data,
            }
        }, options);
    }

    async update(username: string, id: string, data: PartnerView): Promise<Partner> {
        return await this.model.findOneAndUpdate({ username, 'views._id': id }, { // active: true
            $set: {
                'views.$': data,
            }
        });
    }
    
}
