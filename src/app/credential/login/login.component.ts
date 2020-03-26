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
    private cr: Credential;
    private isloading = false;
    private formCredential = this.fb.group({
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
    }

    logOut() {
        this.authService.signOut();
    }


    logIn() {
        this.isloading = true;
        this.cr.Errors.length = 0;
        // const crd: ICredentialDto = {
        //     Email: this.formCredential.value.email,
        //     Password: this.formCredential.value.password
        // }
        // this.authService.authWithCredential(crd, this.formCredential.value.rememberMe);
        this.authService.authWithCredential(
            this.formCredential.value.email,
            this.formCredential.value.password,
            this.formCredential.value.rememberMe);
    }

    test() {
        this.authService.testSecure();
    }

    test1() {
    }
}
