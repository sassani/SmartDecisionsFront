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
    private isLoading: boolean = false;
    private changedSuccessfully: boolean = false;
    private errors: IError[] = [];
    private token: string = null;

    // fGroup = new FormGroup({
    //     newPassword: new FormControl(),
    //     newPasswordConfirm: new FormControl()
    // })



    private fGroup = this.fb.group({
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
        // this.newPassword = new FormGroup({
        //     'name': new FormControl(this.hero.name, [
        //       Validators.required,
        //       Validators.minLength(4),
        //       forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
        //     ]),
        //     'alterEgo': new FormControl(this.hero.alterEgo),
        //     'power': new FormControl(this.hero.power, Validators.required)
        //   });
    }

    onSubmit() {
        this.isLoading = true;
        this.errors.length = 0;
        const newPass = this.fGroup.value.newPassword;
        const conPass = this.fGroup.value.newPasswordConfirm;
        console.log('fGroup', this.fGroup)
        if (conPass === newPass) {
            if (!!!this.token) {
                const oldPass = this.fGroup.value.oldPassword;
                this.credentilService.changePasswordAuthorized(newPass, oldPass).subscribe(
                    res => {
                        console.log('res: ', res);
                        this.changedSuccessfully = true;
                        this.isLoading = false;
                    },
                    err => {
                        this.isLoading = false;
                        console.log('err: ', err);
                        this.errors = this.errorService.getErrors(err);
                    }
                )

            } else {
                this.credentilService.changePasswordByToken(newPass, this.token).subscribe(
                    res => {
                        console.log('res: ', res);
                        this.changedSuccessfully = true;

                        this.isLoading = false;
                    },
                    err => {
                        this.isLoading = false;
                        console.log('err: ', err);
                        this.errors = this.errorService.getErrors(err);
                    }
                )
            }
        } else {
            alert('Passwords are not unique!');
        }


    }

}
