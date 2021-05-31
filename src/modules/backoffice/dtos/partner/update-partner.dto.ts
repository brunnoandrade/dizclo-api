export class UpdatePartnerDto {
    constructor(
        public name: string,
        public username: string,
        public email: string,
        public avatar: string,
        public stars: number,
        public latitude: string,
        public longitude: string
    ) {

    }
}
