import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ICredentialDto } from '../_interfaces/DTOs/ICredentialDto';
import { RequestTypes } from "../constants";



const BASE_URL = 'identity/credential';

@Injectable({
    providedIn: 'root'
})
export class CredentialService {
    constructor(private apiService: ApiService) { }

    sendForgotPasswordEmail(email: string) {
        return this.apiService.get(`${BASE_URL}/forgotpassword/${email}`);
    }

    changePasswordAuthorized(newPass: string, oldPass: string) {
        let crDto: ICredentialDto = {
            RequestType: RequestTypes.CHANGE_PASSWORD,
            Password: oldPass,
            NewPassword: newPass,
        }
        return this.apiService.put(`${BASE_URL}/password`, crDto);
    }

    changePasswordByToken(newPass: string, token: string) {
        let crDto: ICredentialDto = {
            RequestType: RequestTypes.FORGOT_PASSWORD,
            ResetPasswordToken: token,
            NewPassword: newPass,
        }
        return this.apiService.put(`${BASE_URL}/forgotpassword`, crDto);
    }

    register(email: string, password: string) {
        let crDto: ICredentialDto = {
            RequestType: RequestTypes.REGISTER,
            Email: email,
            Password: password
        }
        return this.apiService.post(BASE_URL, crDto);
    }

    baseInfo() {
        return this.apiService.get(BASE_URL);
    }

    verifyEmail(token: string) {
        return this.apiService.post(`${BASE_URL}/emailverification`, { token });
    }

    emailVerificationRequest(email: string) {
        return this.apiService.get(`${BASE_URL}/emailverification/${email}`);
    }
}
