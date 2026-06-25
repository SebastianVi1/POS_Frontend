export interface User {
  id?: string | null;
  username: string;
  password: string;
  role?: string;
}

export interface UserLogin {
  username: string;
  password: string;
}
