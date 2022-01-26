export class UpdatePartnerDto {
  constructor(
    public fullName: string,
    public birthday: string,
    public gender: string[],
    public phoneNumber: string,
  ) {}
}
