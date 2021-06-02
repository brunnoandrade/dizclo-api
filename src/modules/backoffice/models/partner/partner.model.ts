import { User } from "src/modules/backoffice/models/user.model";

export class Partner {
    constructor( 
        public name: string,
        public username: string,
        public email: string,
        public avatar: string,
        public stars: number,
        public latitude: string,
        public longitude: string,
        public user: User
    ) {
       
    }
}
