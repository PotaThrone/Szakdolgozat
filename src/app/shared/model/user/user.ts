export interface User {
  uid: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
}

export interface Comment{
  comment: string;
  rating: number;
  userEmail: string;
}

export enum Role{
  GUEST ,
  USER ,
  ADMIN ,
}
