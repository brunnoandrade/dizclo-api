export class CreatePartnerDto {
  constructor(
    public name: string,
    public userName: string,
    public email: string,
    public password: string,
  ) {}
}
