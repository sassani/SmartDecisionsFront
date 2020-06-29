import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Profile } from '../_models/profile';
import { BehaviorSubject } from 'rxjs';
import { tap, share } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { FormTools } from '../_helpers/formTools';
import { Address } from '../_models/address';


const BASE_URL = 'api/profile';


@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private profile: Profile = new Profile();
    public profile$ = new BehaviorSubject<Profile>(this.profile);
    constructor(private apiService: ApiService) { }


    public fechtProfileApi(): boolean {
        this.profile = new Profile();
        this.apiService.get<any>(BASE_URL).subscribe(
            res => {
                Object.assign(this.profile, res['data']);
                console.log('res[data]', res['data']);
                let tempAddress:Address = new Address();
                // let tempAddressList: Address[] = [];
                tempAddress.address1='2222 Concord Sq NE';
                // tempAddressList.push(tempAddress);
                this.profile.address.push(tempAddress);
                this.profile$.next(this.profile);
                return true;
            }
        )
        return false;
    }

    public saveProfile(prf: FormGroup) {
        if (!!this.profile.firstName) {
            return this.apiService.patch(BASE_URL, FormTools.getChangedValues(prf))

            // .subscribe(
            //     res => {
            //         this.fechtProfileApi();
            //     },
            //     err => {

            //     });
        } else {
            return this.apiService.post(BASE_URL, prf.value)
            // .subscribe(
            //     res => {
            //         this.fechtProfileApi();
            //     },
            //     err => {

            //     })
        }
    }

    public saveProfileAvatar(source) {
        var formData = new FormData();
        formData.append('imageFile', source);
        return this.apiService.post(`${BASE_URL}/avatar`, formData)
        // .subscribe(
        //     res=>{
        //         this.fechtProfileApi();
        //     }
        // );
    }

    public removeAvatar() {
        return this.apiService.delete(`${BASE_URL}/avatar/${this.profile.avatar.id}`)
        // .subscribe(
        //     res=>{
        //         this.fechtProfileApi();
        //     }
        // );
    }

    public saveProfileContact() {

    }
}
