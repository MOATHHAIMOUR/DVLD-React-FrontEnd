export interface ILogin {
  username: string;
  password: string;
}

export interface IAuthResponse {
  userName: string;
  password: string;
  authenticationMessage: string;
  jwtToken: string;
  imageUrl: string;
  refreshToken: string;
  tokenExpirersAt: Date;
  refreshTokenExpiration: Date;
  isValid: boolean;
}
