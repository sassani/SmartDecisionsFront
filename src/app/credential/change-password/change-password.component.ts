import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { IError } from 'src/app/_interfaces/IError';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CredentialService } from 'src/app/_services/credential.service';
import { ErrorService } from 'src/app/_services/error.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['../../../styles/form.css']
})
export class ChangePasswordComponent implements OnInit {
    isLoading: boolean = false;
    changedSuccessfully: boolean = false;
    errors: IError[] = [];
    token: string = null;

    // fGroup = new FormGroup({
    //     newPassword: new FormControl(),
    //     newPasswordConfirm: new FormControl()
    // })



    fGroup = this.fb.group({
        oldPassword: [null, [Validators.required]],
        newPassword: [null, [Validators.required, Validators.minLength(8)]],
        newPasswordConfirm: [null, Validators.required]
    })

    // get oldPassword() { return this.fGroup.get('oldPassword') };
    // get newPassword() { return this.fGroup.get('newPassword') };
    // get newPasswordConfirm() { return this.fGroup.get('newPasswordConfirm') };

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private credentilService: CredentialService,
        private errorService: ErrorService) {
        this.token = this.route.snapshot.paramMap.get('token');
    }

    ngOnInit() {
    }

    onSubmit() {
        this.isLoading = true;
        this.errors.length = 0;
        const newPass = this.fGroup.value.newPassword;
        const conPass = this.fGroup.value.newPasswordConfirm;
        if (conPass === newPass) {
            if (!!!this.token) {
                const oldPass = this.fGroup.value.oldPassword;
                this.credentilService.changePasswordAuthorized(newPass, oldPass).subscribe(
                    res => {
                        this.changedSuccessfully = true;
                        this.isLoading = false;
                    },
                    err => {
                        this.isLoading = false;
                        this.errors = this.errorService.getErrors(err);
                    }
                )

            } else {
                this.credentilService.changePasswordByToken(newPass, this.token).subscribe(
                    res => {
                        this.changedSuccessfully = true;
                        this.isLoading = false;
                    },
                    err => {
                        this.isLoading = false;
                        this.errors = this.errorService.getErrors(err);
                    }
                )
            }
        } else {
            alert('Passwords are not unique!');
        }


    }

}
