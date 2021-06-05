export class CreateCustomerDto {
    constructor( 
        public name: string,
        public username: string,
        public email: string,
        public password: string
    ) {
       
    }
}
