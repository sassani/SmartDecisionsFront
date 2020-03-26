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
    private isLoading: boolean = false;
    private isVerifiedSuccessfully: boolean = false;
    private token: string = null;
    private errors: IError[] = [];
    private email: string = null;

    constructor(
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
        this.crService.emailVerificationRequest().subscribe(
            res => {
                this.isLoading = false;
                this.email = res['data'];
            },
            err => {
                this.isLoading = false;

            }
        )

    }

}
