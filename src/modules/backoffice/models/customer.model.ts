import { User } from 'src/modules/backoffice/models/user.model';

export class Customer {
  constructor(
    public userName: string,
    public fullName: string,
    public birthday: string,
    public gender: string[],
    public phoneNumber: string,
    public document: string,
    public email: string,
    public user: User,
  ) {}
}
