import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ICredentialDto, RequestTypes } from '../_interfaces/DTOs/ICredentialDto';
import { IError } from '../_interfaces/IError';
import { TokenService } from './token.service';
import { BehaviorSubject, of } from 'rxjs';
import { Credential } from '../_models/credential';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private readonly CLIENT_ID: string = environment.clientId;
    public credential = new Credential();
    private _subject = new BehaviorSubject<Credential>(this.credential);
    private rememberMe: boolean = false;

    public credential$ = this._subject.asObservable();

    constructor(
        private apiService: ApiService,
        private tokenService: TokenService,
        private router: Router,
        private errorService: ErrorService
    ) { }

    // public authWithCredential(crDto: ICredentialDto, rememberMe: boolean) {
    //     crDto.RequestType = RequestTypes.ID_TOKEN;
    //     crDto.ClientId = this.CLIENT_ID;
    //     this.rememberMe = rememberMe;
    //     this.authenticate(crDto).subscribe();
    // }


    public authWithCredential(email: string, password: string, rememberMe: boolean = false) {
        const crd: ICredentialDto = {
            RequestType: RequestTypes.ID_TOKEN,
            ClientId: this.CLIENT_ID,
            Email: email,
            Password: password
        }
        this.rememberMe = rememberMe;
        this.authenticate(crd).subscribe();
    }

    public authoAuthenticate() {
        if (!!this.tokenService.retriveRefreashToken()) {
            this.renewAccessToken().subscribe();
        }
    }

    public renewAccessToken() {
        const crDto: ICredentialDto = {
            RequestType: RequestTypes.REFRESH_TOKEN,
            RefreshToken: null
        }

        if (!!this.credential.RefreshToken) {
            crDto.RefreshToken = this.credential.RefreshToken;
        } else if (!!this.tokenService.retriveRefreashToken()) {
            crDto.RefreshToken = this.tokenService.retriveRefreashToken();
        } else {
            // there is now refreshToken. redirect to login
            this.router.navigate(['/auth']);
            return of(false);
        }

        return this.authenticate(crDto);
    }

    private authenticate(crDto: ICredentialDto) {
        return this.apiService.post('auth', crDto).pipe(
            tap(
                auth => {
                    this.credential = this.tokenService.tokenMapper(auth['data'].authToken);
                    if (this.rememberMe) this.tokenService.storeRefreshToken(this.credential.RefreshToken);

                    let redirectTo = localStorage.getItem('redirect-to');
                    localStorage.removeItem('redirect-to');
                    if (!redirectTo) redirectTo = '/admin';
                    this.router.navigate([redirectTo]);// TODO: support query params

                    this._subject.next(this.credential);
                }),
            catchError(err => {
                this.credential.Errors = this.errorService.getErrors(err);
                this._subject.next(this.credential);
                return of(false);
            }))
    }


    // private authenticate(crDto: ICredentialDto) {
    //     return this.apiService.post('auth', crDto).subscribe(
    //         auth => {
    //             this.credential = this.tokenService.tokenMapper(auth['data'].authToken);
    //             if (this.rememberMe) this.tokenService.storeRefreshToken(this.credential.RefreshToken);

    //             let redirectTo = localStorage.getItem('redirect-to');
    //             localStorage.removeItem('redirect-to');
    //             if (!redirectTo) redirectTo = '/dashboard';
    //             this.router.navigate([redirectTo]);// TODO: support query params

    //             this._subject.next(this.credential);
    //         },
    //         err => {
    //             this.credential.Errors = this.errorService.getErrors(err);
    //             this._subject.next(this.credential);
    //             return of(false);
    //         })
    // }

    public signOut() {
        this.apiService.delete('auth').subscribe(
            res => {
                this.tokenService.clearTokens();
                this.credential = new Credential()
                this._subject.next(this.credential);
            },
            err => {
                this.credential.Errors = this.errorService.getErrors(err);
            })
    }

    public testSecure() {
        const temp = this.apiService.get('info/secure').subscribe(
            res => {
            },
            err => {

            }
        );
    }

    public testInSecure() {
        const temp = this.apiService.get('info').subscribe(
            res => {
            },
            err => {
            }
        );
    }
}
