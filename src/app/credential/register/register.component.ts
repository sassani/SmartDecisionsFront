import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IError } from 'src/app/_interfaces/IError';
import { CredentialService } from 'src/app/_services/credential.service';
import { ICredentialDto } from 'src/app/_interfaces/DTOs/ICredentialDto';
import { ErrorService } from 'src/app/_services/error.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['../../../styles/form.css']
})
export class RegisterComponent implements OnInit {
    private isloading: boolean = false;
    private errors: IError[] = [];
    private frmGroup = this.fb.group({
        email: [null, Validators.required],
        password: [null, Validators.required],
        passwordConfirm: [null, Validators.required]
    })

    constructor(
        private fb: FormBuilder,
        private crService: CredentialService,
        private errorService: ErrorService,
        private authService: AuthService,
        private router:Router
    ) { }

    ngOnInit() {
    }

    onSubmit() {
        this.errors.length = 0;
        const pass = this.frmGroup.value.password;
        const passCon = this.frmGroup.value.passwordConfirm;
        const email = this.frmGroup.value.email;
        if (passCon === pass) {
            this.isloading = true;
            this.crService.register(email, pass).subscribe(
                res => {
                    this.isloading = false;
                    this.authService.authWithCredentialPlain(email, pass);
                    this.router.navigate(['/home'])// TODO: navigate authenticated user to the dashboard.
                },
                err => {
                    this.isloading = false;
                    this.errors= this.errorService.getErrors(err);
                }
            )

        } else {
            alert('Passwords are not unique!');
        }
    }

}
