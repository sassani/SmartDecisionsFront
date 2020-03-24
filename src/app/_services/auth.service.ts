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
    private credential = new Credential();
    private _subject = new BehaviorSubject<Credential>(this.credential);
    private rememberMe: boolean = false;

    public credential$ = this._subject.asObservable();

    constructor(
        private apiService: ApiService,
        private tokenService: TokenService,
        private router: Router,
        private errorService: ErrorService
    ) { }

    public authWithCredential(crDto: ICredentialDto, rememberMe: boolean) {
        crDto.RequestType = RequestTypes.ID_TOKEN;
        crDto.ClientId = this.CLIENT_ID;
        this.rememberMe = rememberMe;
        this.authenticate(crDto);
    }

    public authoAuthenticate() {
        // console.log('Auto authenticate... : ', !!this.tokenService.retriveRefreashToken())
        if (!!this.tokenService.retriveRefreashToken()) {
            this.renewAccessToken().subscribe();
        }
    }

    public renewAccessToken() {
        const crDto: ICredentialDto = {
            RequestType: RequestTypes.REFRESH_TOKEN,
            RefreshToken: null
        }

        // console.log('this.credential.RefreshToken', !!this.credential.RefreshToken)
        // console.log('this.tokenService.retriveRefreshToken()', !!this.tokenService.retriveRefreashToken())

        if (!!this.credential.RefreshToken) {
            crDto.RefreshToken = this.credential.RefreshToken;
        } else if (!!this.tokenService.retriveRefreashToken()) {
            crDto.RefreshToken = this.tokenService.retriveRefreashToken();
        } else {
            // there is now refreshToken. redirect to login
            // console.log('Redirect to login Page');
            this.router.navigate(['/login']);
            return of(false);
        }

        // console.log(crDto);

        return this.apiService.post('auth', crDto)
            .pipe(
                tap(
                    auth => {
                        this.credential = this.tokenService.tokenMapper(auth['data'].authToken);
                        if (this.rememberMe) this.tokenService.storeRefreshToken(this.credential.RefreshToken);
                        this._subject.next(this.credential);
                    }
                )
                ,
                catchError(err => {
                    return of(false);
                })
            );
    }

    private authenticate(crDto: ICredentialDto) {
        return this.apiService.post('auth', crDto).subscribe(
            auth => {
                this.credential = this.tokenService.tokenMapper(auth['data'].authToken);
                this.credential.IsAuthenticated = true;
                if (this.rememberMe) this.tokenService.storeRefreshToken(this.credential.RefreshToken);
                this._subject.next(this.credential);
            },
            err => {
                this.credential.Errors = this.errorService.getErrors(err);
                this._subject.next(this.credential);
            })
    }

    public signOut() {
        this.apiService.delete('auth').subscribe(
            res => {
                this.tokenService.clearTokens();
                this._subject.next(new Credential());
            },
            err => {
                this.credential.Errors = this.errorService.getErrors(err);
            })
    }

    public testSecure() {
        console.log('test Secure Info running...')
        const temp = this.apiService.get('info/secure').subscribe(
            res => {
                console.log('Response', res);
            },
            err => {
                console.log('Error', err);

            }
        );
    }

    public testInSecure() {
        console.log('test InSecure Info running...')
        const temp = this.apiService.get('info').subscribe(
            res => {
                console.log('Response', res);
            },
            err => {
                console.log('Error', err);

            }
        );
    }
}
