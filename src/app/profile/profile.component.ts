import { Component, OnInit } from '@angular/core';
import { IError } from '../_interfaces/IError';
import { Validators, FormBuilder } from '@angular/forms';
import { Profile } from '../_models/profile';
import { ProfileService } from '../_services/profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../styles/form.css', '../../styles/images.css']
})
export class ProfileComponent implements OnInit {

    private profile: Profile = new Profile();
    private isloading: boolean = true;
    private isSubmiting: boolean = false;
    private errors: IError[] = [];
    private frmGroup = this.fb.group({
        firstName: [this.profile.firstName, Validators.required],
        lastName: [this.profile.lastName, Validators.required],
        company: [this.profile.company, Validators.required]
    })


    constructor(
        private fb: FormBuilder,
        private prfService: ProfileService
    ) { }

    ngOnInit() {
        this.isloading = true;
        this.prfService.profile$.subscribe(val => {
            this.isloading = false;
            this.profile = val;
            this.frmGroup.controls["firstName"].setValue(this.profile.firstName);
            this.frmGroup.controls["lastName"].setValue(this.profile.lastName);
            this.frmGroup.controls["company"].setValue(this.profile.company);
        });
    }


}
