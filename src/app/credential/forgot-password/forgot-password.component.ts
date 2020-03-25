import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { ICredentialDto, RequestTypes } from 'src/app/_interfaces/DTOs/ICredentialDto';
import { CredentialService } from 'src/app/_services/credential.service';
import { ErrorService } from 'src/app/_services/error.service';
import { IError } from 'src/app/_interfaces/IError';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['../../../styles/form.css']
})
export class ForgotPasswordComponent implements OnInit {
    private isLoading: boolean = false;
    private wasSent: boolean = false;
    private errors: IError[] = [];
    private formCredential = this.fb.group({
        email: [null, Validators.required],
    })
    constructor(
        private fb: FormBuilder,
        private credentiService: CredentialService,
        private errorService: ErrorService
    ) { }

    ngOnInit() {
    }

    send() {
        this.isLoading = true;
        this.errors.length = 0;
        this.wasSent = false;
        // const crd: ICredentialDto = {
        //     Email: this.formCredential.value.email,
        //     RequestType: RequestTypes.FORGOT_PASSWORD
        // }
        this.credentiService.sendForgotPasswordEmail(this.formCredential.value.email).subscribe(
            res => {
                console.log('res: ', res);
                this.isLoading = false;
                this.wasSent = true;
            },
            err => {
                this.isLoading = false;
                console.log('err: ', err);
                this.errors = this.errorService.getErrors(err);
            }
        )
    }
}
