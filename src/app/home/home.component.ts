import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ApiService } from '../_services/api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private apiService: ApiService
    ) { }

    ngOnInit() {
    }
    testSecure() {
        console.log('testSecure running...')
        this.apiService.get<any>("api/profile").subscribe(
            res => {
                console.log('res', res);
            }
        )
    }
    testInSecure() {
        console.log('testInSecure running...')
        this.apiService.get<any>("info").subscribe(
            res => {
                console.log('res', res['data']);
            }
        )
    }
}
