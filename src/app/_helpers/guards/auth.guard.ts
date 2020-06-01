import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { Credential } from '../../_models/credential';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private credential: Credential = new Credential();
    constructor(
        private authService: AuthService,
        private router: Router) {
        this.authService.credential$.subscribe(cr => this.credential = cr)
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkLogin(state.url);
    }

    checkLogin(url: string): boolean {
        if (this.credential.IsAuthenticated) { return true; }

        // Store the attempted URL for redirecting
        localStorage.setItem('redirect-to', url)// TODO: add suport for query params

        // Navigate to the login page with extras
        this.router.navigate(['/auth']);
        return false;
    }

}
