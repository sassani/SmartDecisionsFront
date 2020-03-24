export interface ICredential{
    publicId: string;
    email: string;
    isAuthenticated: boolean;
    isEmailVerified: boolean;
    isActive: boolean;
}