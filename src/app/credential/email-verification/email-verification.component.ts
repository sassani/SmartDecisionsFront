import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { IError } from 'src/app/_interfaces/IError';
import { CredentialService } from 'src/app/_services/credential.service';
import { ErrorService } from 'src/app/_services/error.service';

@Component({
    selector: 'app-email-verification',
    templateUrl: './email-verification.component.html',
    styleUrls: ['../../../styles/form.css']
})
export class EmailVerificationComponent implements OnInit {
    isLoading: boolean = false;
    isVerifiedSuccessfully: boolean = false;
    token: string = null;
    errors: IError[] = [];
    message: string = null;
    broadCast: BroadcastChannel = new BroadcastChannel('smartDecisionChanel');

    fGroup = this.fb.group({
        email: [null, [Validators.required]]
    })

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private crService: CredentialService,
        private errorService: ErrorService
    ) {
        this.token = this.route.snapshot.paramMap.get('token');
    }

    ngOnInit() {
        if (!!this.token) {
            this.isLoading = true;
            this.crService.verifyEmail(this.token).subscribe(
                res => {
                    this.isLoading = false;
                    this.isVerifiedSuccessfully = true;
                    this.broadCast.postMessage({ 'isEmailVerified': true });
                },
                err => {
                    this.isLoading = false;
                    this.errors = this.errorService.getErrors(err);
                }
            )
        }
    }

    onSubmit() {
        this.isLoading = true;
        this.errors.length = 0;
        this.crService.emailVerificationRequest(this.fGroup.value.email).subscribe(
            res => {
                this.isLoading = false;
                this.message = res['data']["message"];
            },
            err => {
                this.isLoading = false;
                this.errors = this.errorService.getErrors(err);
            }
        )

    }

}
