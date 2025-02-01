export interface IPayloadResetPassword {
  newPassword: string;
  confirmPassword?: string;
  token: string;
}
