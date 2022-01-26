export class CreatePartnerDto {
  constructor(
    public userName: string,
    public fullName: string,
    public birthday: string,
    public gender: string[],
    public phoneNumber: string,
    public document: string,
    public email: string,
    public password: string,
  ) {}
}
