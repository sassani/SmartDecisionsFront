import { Component, OnInit } from '@angular/core';
import { IError } from '../_interfaces/IError';
import { Validators, FormBuilder } from '@angular/forms';
import { Profile } from '../_models/profile';
import { ProfileService } from '../_services/profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../styles/form.css', '../../styles/images.css', './profile.component.scss']
})
export class ProfileComponent implements OnInit {

    private profile: Profile = new Profile();
    private isloading: boolean = true;
    private isSubmiting: boolean = false;

    private test: boolean  = false;

    private isUnsaved = false;

    private isSubmitDeactive: boolean = true;
    private isProfilePending: boolean = false;
    private isAvatarPending: boolean = false;
    private hasNewImage: boolean = false;
    private hasImage: boolean = false;
    private errors: IError[] = [];
    private imageUrl: any;
    private imageFile: any;


    private frmGroup = this.fb.group({
        firstName: [this.profile.firstName, Validators.required],
        lastName: [this.profile.lastName, Validators.required],
        company: [this.profile.company],

        address1:[this.profile.address[0].address1, Validators.required],
        address2:[this.profile.address[0].address2, Validators.required],
        city:[this.profile.address[0].city, Validators.required],
        state:[this.profile.address[0].state, Validators.required],
        country:[this.profile.address[0].country, Validators.required],
        zipcode:[this.profile.address[0].zipcode, Validators.required],
        phonenumber:[this.profile.address[0].phoneNumber, Validators.required],
    })


    constructor(
        private fb: FormBuilder,
        private prfService: ProfileService
    ) { }

    ngOnInit() {
        this.isloading = true;
        this.prfService.profile$.subscribe(val => {
            // console.log('profile subscribes')
            this.profile = new Profile();
            this.isloading = false;
            this.profile = Object.assign(this.profile, val);
            this.initiateForm()
        });
        this.onChanges();
    }

    onChanges(): void {
        this.frmGroup.valueChanges.subscribe(val => {
            // console.log('val', val);
            // console.log('is dirty: ', this.frmGroup.dirty);
            this.isUnsaved = this.frmGroup.dirty;
        });
    }

    private setImageUrl() {
        if (!!this.profile.avatar) {
            this.imageUrl = this.profile.avatar.url;
            this.hasImage = true;
        } else {
            this.imageUrl = "../../assets/avatar-bg.png";
            this.hasImage = false;
        }
    }

    initiateForm() {
        this.frmGroup.controls["firstName"].setValue(this.profile.firstName);
        this.frmGroup.controls["lastName"].setValue(this.profile.lastName);
        this.frmGroup.controls["company"].setValue(this.profile.company);
        this.setImageUrl();
    }

    onFileChanged(e) {
        const file = e.target.files[0];
        this.imageFile = file;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            this.imageUrl = reader.result;
            this.hasNewImage = true;
            this.isUnsaved = true;
        }
    }

    onSubmit() {
        if (this.frmGroup.dirty) {
            this.saveProfile();
        }
        else if (this.hasNewImage && !!this.profile.firstName) {
            this.saveAvatar();
        }
    }

    saveProfile() {
        this.isProfilePending = true;
        this.prfService.saveProfile(this.frmGroup).subscribe(
            res => {
                this.isProfilePending = false;
                if (this.hasNewImage) {
                    this.saveAvatar();
                } else {
                    this.updateProfile();
                }
            }
        );
    }

    saveAvatar() {
        this.isAvatarPending = true;
        this.prfService.saveProfileAvatar(this.imageFile).subscribe(
            res => {
                this.hasNewImage = false;
                this.isAvatarPending = false;
                this.updateProfile();
            }
        );
    }

    updateProfile() {
        if (!this.isProfilePending && !this.isAvatarPending) {
            this.prfService.fechtProfileApi();
            this.isSubmitDeactive = true;
            this.isUnsaved = false;
        }
    }

    onRemoveAvatar() {
        this.prfService.removeAvatar().subscribe(
            res => {
                // this.hasImage = false;
                this.prfService.fechtProfileApi();
            }
        );
    }

    onTest(){
        console.log('profile', this.profile);
        this.test = true;
    }


}
