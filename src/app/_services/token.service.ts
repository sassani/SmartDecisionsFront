import { Injectable } from '@angular/core';
import { IAuthToken } from '../_interfaces/DTOs/IAuthTokenDto';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Credential } from '../_models/credential';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private jwt = new JwtHelperService();
    private readonly ACCESS_TOKEN = 'access-token';
    private readonly REFRESH_TOKEN = 'refresh-token';
    constructor() { }


    public storeRefreshToken(token: string) {
        localStorage.setItem(this.REFRESH_TOKEN, token);
    }

    public retriveRefreashToken(): string {
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    public validateToken(token:string):boolean{
        let obj = this.jwt.decodeToken(token);
        return true;
    }

    public tokenMapper(cr:Credential, authToken: IAuthToken){
        // let cr: Credential = new Credential();
        cr.PublicId = authToken.uid;
        cr.RefreshToken = authToken.refreshToken;
        cr.AccessToken = authToken.accessToken;
        cr.IsAuthenticated = true;
        const accesstoken = this.jwt.decodeToken(cr.AccessToken);
        cr.Email = accesstoken.Email;
        cr.IsEmailVerified = accesstoken.isEmailVerified;
        cr.Roles = accesstoken.roles;// TODO:convert sring to string[]
        // return cr;
    }

    public clearTokens() {
        localStorage.removeItem(this.REFRESH_TOKEN);
    }
}

