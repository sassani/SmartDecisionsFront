import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit() {
    }
    test(secure: boolean = false) {
        if (secure) {
            this.authService.testSecure();
        } else {
            this.authService.testInSecure();
        }
    }
}
