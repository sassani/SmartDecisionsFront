import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
    selector: 'user-auth-status',
    templateUrl: './user-auth-status.component.html',
    styleUrls: ['./user-auth-status.component.css']
})
export class UserAuthStatusComponent implements OnInit {
    isAuth: boolean = false;
    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.credential$.subscribe(
            (cr) => {
                this.isAuth = cr.IsAuthenticated;
            },
            (err) => {
            })
        this.authService.authoAuthenticate();
    }



}
