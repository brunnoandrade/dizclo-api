export class UpdateCustomerDto {
  constructor(
    public fullName: string,
    public birthday: string,
    public gender: string[],
    public phoneNumber: string,
  ) {}
}
