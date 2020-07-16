import { Component, OnInit } from '@angular/core';
import { IError } from '../_interfaces/IError';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Profile } from '../_models/profile';
import { ProfileService } from '../_services/profile.service';

const AVARAT_DEFAULT = "../../assets/avatar-bg.png";
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../styles/form.css', '../../styles/images.css', './profile.component.scss']
})
export class ProfileComponent implements OnInit {

    profile: Profile = new Profile();
    isloading: boolean = true;

    private isProfileDirty: boolean = false;
    private isContactDirty: boolean = false;
    private isAvatarDirty: boolean = false;
    isDirty = () => {
        return (
            this.isProfileDirty ||
            this.isContactDirty ||
            this.isAvatarDirty
        );
    }

    private isProfilePending: boolean = false;
    private isContactPending: boolean = false;
    private isAvatarPending: boolean = false;
    isSavePending = () => {
        return (
            this.isProfilePending ||
            this.isContactPending ||
            this.isAvatarPending
        )
    }

    hasAvatar: boolean = false;
    hasCommandToRemoveAvatar: boolean = false;
    errors: IError[] = [];
    imageUrl: any;
    imageFile: any;

    fgProfile = this.fb.group({
        firstName: [null, [Validators.required, Validators.minLength(3)]],
        lastName: [null, [Validators.required, Validators.minLength(3)]],
        company: [null]
    });
    get firstName() { return this.fgProfile.controls.firstName }
    get lastName() { return this.fgProfile.controls.lastName }
    get company() { return this.fgProfile.controls.company }

    fgContact = this.fb.group({
        address1: null,
        address2: null,
        city: null,
        state: null,
        country: null,
        zipcode: null,
        phonenumber: null
    });
    get address1() { return this.fgContact.controls.address1 }
    get address2() { return this.fgContact.controls.address2 }
    get city() { return this.fgContact.controls.city }
    get state() { return this.fgContact.controls.state }
    get country() { return this.fgContact.controls.country }
    get zipcode() { return this.fgContact.controls.zipcode }
    get phonenumber() { return this.fgContact.controls.phonenumber }


    constructor(
        private fb: FormBuilder,
        private prfService: ProfileService
    ) { }

    ngOnInit() {
        this.prfService.isPending$.subscribe(res => {
            this.isloading = res;
            if (this.isloading) {
                this.fgProfile.disable();
                this.fgContact.disable();
            } else {
                this.fgProfile.enable();
                this.fgContact.enable();

            }
        });
        this.prfService.profile$.subscribe(val => {
            this.profile = new Profile();
            this.profile = Object.assign(this.profile, val);
            this.initiateForm()
        });
        this.onChanges();
    }

    //#region Events
    onChanges(): void {
        this.fgProfile.valueChanges.subscribe(val => {
            this.isProfileDirty = this.fgProfile.dirty;
        });
        this.fgContact.valueChanges.subscribe(val => {
            this.isContactDirty = this.fgContact.dirty;
        });
    }

    onFileChanged(e) {
        const file = e.target.files[0];
        this.imageFile = file;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            this.imageUrl = reader.result;
            this.hasAvatar = true;
            this.isAvatarDirty = true;
        }
    }

    onRemoveAvatar() {
        this.hasCommandToRemoveAvatar = true;
        this.isAvatarDirty = true;
        this.imageUrl = AVARAT_DEFAULT;
        this.hasAvatar = false;
    }

    onSubmit() {
        if (this.fgProfile.invalid || this.fgContact.invalid) {
            this.markAllFormgroupControlsAsTouched(this.fgProfile);
            this.markAllFormgroupControlsAsTouched(this.fgContact);
        } else {
            if (this.isProfileDirty) this.saveProfile();
            if (!!this.profile.firstName) {
                this.checkOtherThanProfile();
            }
        }
    }
    //#endregion

    private markAllFormgroupControlsAsTouched(frm: FormGroup) {
        for (let control in frm.controls) {
            frm.controls[control].markAsTouched();
        }
    }

    private setImageUrl() {
        if (!!this.profile.avatar) {
            this.imageUrl = this.profile.avatar.url;
            this.hasAvatar = true;
        } else {
            this.imageUrl = AVARAT_DEFAULT;
            this.hasAvatar = false;
        }
    }

    private initiateForm() {
        this.fgProfileInit();
        this.fgContactInit();
        this.setImageUrl();

    }

    private fgProfileInit() {
        this.fgProfile.patchValue({
            firstName: this.profile.firstName,
            lastName: this.profile.lastName,
            company: this.profile.company
        });
    }

    private fgContactInit() {
        if (this.profile.contacts.length>0) {
            var contact = this.profile.contacts[0];
            this.fgContact.patchValue(
                {
                    address1: contact.address1,
                    address2: contact.address2,
                    city: contact.city,
                    state: contact.state,
                    country: contact.country,
                    zipcode: contact.zipcode,
                    phonenumber: contact.phoneNumber,
                });
        };
    }

    private checkOtherThanProfile() {
        if (this.isAvatarDirty) this.saveAvatar();
        if (this.isContactDirty) this.saveContact();
    }

    private saveProfile() {
        this.isProfilePending = true;
        this.prfService.saveProfileGeneral(this.fgProfile).subscribe(
            res => {
                this.isProfilePending = false;
                this.checkOtherThanProfile();
                this.updateProfile();
            }
        );
    }

    private saveAvatar() {
        this.isAvatarPending = true;
        if (this.hasCommandToRemoveAvatar) {
            this.prfService.removeAvatar().subscribe(
                res => {
                    this.hasCommandToRemoveAvatar = false;
                    this.isAvatarDirty = false;
                    this.isAvatarPending = false;
                    this.updateProfile();
                }
            );
        } else {
            this.prfService.saveProfileAvatar(this.imageFile).subscribe(
                res => {
                    this.isAvatarDirty = false;
                    this.isAvatarPending = false;
                    this.updateProfile();
                }
            );
        }
    }

    private saveContact() {
        this.isContactPending = true;
        this.prfService.saveProfileContact(this.fgContact).subscribe(
            res => {
                this.isContactPending = false;
                this.updateProfile();
            }
        )
    }

    private updateProfile() {
        if (!this.isSavePending()) this.prfService.getProfile();
        this.fgProfile.markAsPristine();
        this.fgContact.markAsPristine();
    }
}
