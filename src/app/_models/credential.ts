import { IError } from '../_interfaces/IError';
import { Profile } from './profile';

export class Credential {

    constructor() { }
    PublicId: string = null;
    Email: string = null;
    IsAuthenticated: boolean = false;
    IsEmailVerified: boolean = false;
    // IsActive: boolean = false;
    Errors: IError[] = [];
    AccessToken: string = null;
    RefreshToken: string = null;
    Roles: string[] = [];
    Profile: Profile;
}