import { Pet } from "./pet.model";
import { Address } from "./address.model";
import { CreditCard } from "./credit-card.model";

export class User {
    constructor( 
        public name: string,
        public document: string,
        public email: string,
        public password: string,
        public pets: Pet[],
        public billingAddress: Address,
        public shippingAddress: Address,
        public creditCard: CreditCard,
        public active: boolean
    ) {
       
    }
}
