import { Model } from 'mongoose';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { Address } from 'src/modules/backoffice/models/address.model';
import { AddressType } from 'src/modules/backoffice/enums/address-type.enum';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<Customer>,
    private readonly httpService: HttpService,
  ) {}

  async create(
    username: string,
    data: Address,
    type: AddressType,
  ): Promise<Customer> {
    const options = { upsert: true };
    if (type === AddressType.Billing) {
      return await this.model.findOneAndUpdate(
        { username },
        {
          $set: {
            billingAddress: data,
          },
        },
        options,
      );
    } else {
      return await this.model.findOneAndUpdate(
        { username },
        {
          $set: {
            shippingAddress: data,
          },
        },
        options,
      );
    }
  }

  getAddressByZipCode(zipcode: string) {
    const url = `https://viacep.com.br/ws/${zipcode}/json/`;
    return this.httpService.get(url);
  }
}
