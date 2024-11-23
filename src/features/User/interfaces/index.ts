export interface IApiUser {
  userId: number;
  personId: number;
  username: string;
  password: string;
  isActive: boolean;
}

export interface IFormUser {
  userId: number;
  personId: number;
  username: string;
  password: string;
  confirmPassword: string;
  isActive: boolean;
}

export interface IUserView {
  userId: number;
  personId: number;
  username: string;
  isActive: "Yes" | "No";
}
