import { Pet } from "./pet.model";
import { Address } from "./address.model";
import { CreditCard } from "./credit-card.model";
import { User } from "./user.model";

export class Customer {
    constructor( 
        public name: string,
        public document: string,
        public email: string,
        public password: string,
        public pets: Pet[],
        public billingAddress: Address,
        public shippingAddress: Address,
        public creditCard: CreditCard,
        public active: boolean,
        public User: User
    ) {
       
    }
}
