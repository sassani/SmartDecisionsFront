import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Credential} from '../../_models/credential';

@Component({
    selector: 'user-auth-status',
    templateUrl: './user-auth-status.component.html',
    styleUrls: ['./user-auth-status.component.css']
})
export class UserAuthStatusComponent implements OnInit {
    isAuth: boolean = false;
    private credential: Credential = new Credential();
    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.credential$.subscribe(
            (cr) => {
                this.isAuth = cr.IsAuthenticated;
                this.credential = cr;
            },
            (err) => {
            })
        this.authService.authoAuthenticate();
    }



}
