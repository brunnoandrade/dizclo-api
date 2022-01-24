export class UpdatePartnerDto {
  constructor(
    public name: string,
    public userName: string,
    public email: string,
    public avatar: string,
    public stars: number,
    public latitude: string,
    public longitude: string,
  ) {}
}
