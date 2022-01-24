import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Md5 } from 'md5-typescript';
import { User } from 'src/modules/backoffice/models/user.model';
import { Customer } from 'src/modules/backoffice/models/customer.model';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async create(data: User): Promise<User> {
    const user = new this.userModel(data);
    return await user.save();
  }

  async findByuserName(userName): Promise<User> {
    return await this.userModel.findOne({ userName: userName }).exec();
  }

  async update(userName: string, data: any): Promise<User> {
    return await this.userModel.findOneAndUpdate({ userName }, data);
  }

  async authenticate(userName, password): Promise<Customer> {
    const customer = await this.customerModel
      .findOne({ userName: userName })
      .populate('user')
      .exec();

    const pass = await Md5.init(`${password}${process.env.SALT_KEY}`);
    if (pass.toString() == customer.user.password.toString()) {
      return customer;
    } else {
      return null;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel
      .find({}, 'userName password email active roles')
      .sort('userName')
      .exec();
  }
}
