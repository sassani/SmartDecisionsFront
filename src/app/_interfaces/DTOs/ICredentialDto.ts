export interface ICredentialDto {
    ClientId?: string;
    RequestType?: string;
    Email?: string;
    Password?: string;
    NewPassword?: string;
    RefreshToken?: string;
    ResetPasswordToken?: string;
}