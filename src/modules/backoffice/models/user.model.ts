export class User {
  constructor(
    public email: string,
    public userName: string,
    public password: string,
    public active: boolean,
    public roles: string[],
  ) {}
}
