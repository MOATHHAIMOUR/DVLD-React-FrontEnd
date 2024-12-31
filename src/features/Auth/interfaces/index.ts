export interface ILogin {
  username: string;
  password: string;
}

export interface IAuthResponse {
  userId: string;
  password: string;
  authenticationMessage: string;
  jwtToken: string;
  refreshToken: string;
  tokenExpirersAt: Date;
  refreshTokenExpiration: Date;
  isValid: boolean;
}
