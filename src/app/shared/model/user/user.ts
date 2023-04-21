export interface User {
  uid: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
}

export interface Comment{
  comment: string;
  user: User;
}
