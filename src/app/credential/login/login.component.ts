import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
// import { ICredentialDto } from '../../_interfaces/DTOs/ICredentialDto';
import { Credential } from 'src/app/_models/credential';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../../../styles/form.css']
})
export class LoginComponent implements OnInit {
    cr: Credential;
    isloading = false;
    isPending = false;
    formCredential = this.fb.group({
        email: [null, Validators.required],
        password: [null, Validators.required],
        rememberMe: [false]
    })

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.cr = new Credential()
    }


    ngOnInit() {
        this.authService.credential$.subscribe(
            cr => {
                this.isloading = false;
                this.cr = cr;
            }
        )
        this.authService.isPending$.subscribe(
            r => {
                // console.log('r', r)
                this.isPending = r;
            }
        )
    }

    logOut() {
        this.isloading = true;
        this.authService.signOut();
    }


    logIn() {
        const frm = this.formCredential.value;
        this.isloading = true;
        this.cr.Errors.length = 0;

        this.authService.authWithCredential(
            frm.email,
            frm.password,
            frm.rememberMe).subscribe();
    }
}
