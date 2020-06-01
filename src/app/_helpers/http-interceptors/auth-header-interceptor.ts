import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject, empty, EMPTY } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { Credential } from '../../_models/credential';
import { TokenService } from "../../_services/token.service";
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
    private cr: Credential = new Credential();
    private isRefreshing: boolean = false;
    private accessTokenSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
        private authService: AuthService,
        private tokenService: TokenService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.authService.credential$.subscribe(
            cr => { this.cr = cr }
        )
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('intercept is running', this.cr)
        if (!!this.cr.AccessToken) {
            req = this.addAuthorizationHeader(req, this.cr.AccessToken);
        }
        return next.handle(req).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    localStorage.setItem('redirect-to', this.router.routerState.snapshot.url)// TODO: add suport for query params
                    return this.handle401Error(req, next);
                } else {
                    throw err;
                }
            })
        )
    }

    private addAuthorizationHeader(req: HttpRequest<any>, token: string) {
        return req.clone(
            {
                setHeaders: { Authorization: `Bearer ${token}` }
            }
        )
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        this.authService.renewAccessToken().subscribe(
            (res: Credential) => {
                if (!!res) {
                    const accessToken = res.AccessToken;
                    this.accessTokenSubject$.next(accessToken);
                    return next.handle(this.addAuthorizationHeader(request, accessToken));
                }
            });
        return EMPTY;
    }
}