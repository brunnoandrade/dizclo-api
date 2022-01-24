export class User {
  constructor(
    public email: string,
    public document: string,
    public userName: string,
    public password: string,
    public active: boolean,
    public roles: string[],
  ) {}
}
