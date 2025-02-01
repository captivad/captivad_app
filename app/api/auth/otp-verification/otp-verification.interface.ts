export interface IPayloadOtpVerification {
  email: string;
  otp: string;
}

export interface IPayloadToken {
  email: string;
  uuid: string;
}

export interface IOtpVerification {
  accessToken: string;
}
