import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FAQ } from 'src/modules/backoffice/models/faq.model';
import { UpdateFAQDto } from 'src/modules/backoffice/dtos/faq/update-faq.dto';

@Injectable()
export class FAQService {
  constructor(@InjectModel('FAQ') private readonly model: Model<FAQ>) {}

  async create(data: FAQ): Promise<FAQ> {
    const payload = new this.model(data);
    return await payload.save();
  }

  async update(id: string, data: UpdateFAQDto): Promise<FAQ> {
    return await this.model.findOneAndUpdate({ _id: id }, data);
  }

  async findAll(): Promise<FAQ[]> {
    return await this.model.find({}, 'title description').sort('title');
  }

  async delete(id: string): Promise<FAQ> {
    return await this.model.remove({ _id: id });
  }
}
