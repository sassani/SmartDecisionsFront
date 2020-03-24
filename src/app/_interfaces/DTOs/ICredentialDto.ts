export interface ICredentialDto {
    ClientId?: string;
    RequestType?: string;
    Email?: string;
    Password?: string;
    NewPassword?: string;
    RefreshToken?: string;
    ResetPasswordToken?: string;
}

export const RequestTypes = {
    ID_TOKEN :'idtoken',
    REGISTER :'register',
    CHANGE_PASSWORD :'changepassword',
    FORGOT_PASSWORD :'forgotpassword',
    REFRESH_TOKEN :'refreshtoken',
}