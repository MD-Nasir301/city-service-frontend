export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface VerifyAccountPayload {
  email: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
}
