import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { ICredentialDto } from '../../_interfaces/DTOs/ICredentialDto';
import { Credential } from 'src/app/_models/credential';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private cr: Credential;
    private isloading = false;
    private formCredential = this.fb.group({
        email: [null, Validators.required],
        password: [null, Validators.required],
        rememberMe: [true]
    })

    constructor(private fb: FormBuilder, private authService: AuthService) {
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
        const crd: ICredentialDto = {
            Email: this.formCredential.value.email,
            Password: this.formCredential.value.password
        }
        this.authService.authWithCredential(crd, this.formCredential.value.rememberMe);

    }
    test(){
        // console.log('object', this.cr);
        this.authService.testSecure();
    }
    test1(){
        console.log('Current User', this.cr);
    }
}
