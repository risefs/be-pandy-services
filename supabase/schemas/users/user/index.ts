export interface IUserCredentials {
  email: string;
  password: string;
}

interface IAddress {
  street: string;
  city: string;
  state: string;
  zipcode: string;
  latitude: number;
  longitude: number;
}

export interface IUser {
  firstname: string;
  lastname: string;
  address: IAddress;
  email: string;
  create_at: Date;
  updated_at: Date;
}
