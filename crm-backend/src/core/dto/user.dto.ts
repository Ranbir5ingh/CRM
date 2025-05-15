export class userDto {
  id!: string;
  email!: string;
  phone?: string;
  first_name?: string;
  last_name?: string;

  constructor(partial: Partial<userDto>) {
    Object.assign(this, partial);
  }
}
