// import { Address } from './address.model';
// import { CreditCard } from './credit-card.model';
import { User } from './user.model';

export class Customer {
  constructor(
    public userName: string,
    public fullName: string,
    public birthday: string,
    public gender: string[],
    public phoneNumber: string,
    public document: string,
    public email: string,
    // public billingAddress: Address,
    // public shippingAddress: Address,
    // public creditCard: CreditCard,
    public user: User,
  ) {}
}
