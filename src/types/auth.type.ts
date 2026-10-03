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
