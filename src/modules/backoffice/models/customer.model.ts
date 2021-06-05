import { Address } from "./address.model";
import { CreditCard } from "./credit-card.model";
import { User } from "./user.model";

export class Customer {
    constructor( 
        public name: string,
        public username: string,
        public email: string,
        public billingAddress: Address,
        public shippingAddress: Address,
        public creditCard: CreditCard,
        public user: User
    ) {
       
    }
}
