import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Profile } from '../_models/profile';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormTools } from '../_helpers/formTools';


const BASE_URL = 'api/profile';


@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private profile: Profile = new Profile();
    public profile$ = new BehaviorSubject<Profile>(this.profile);
    public isPending$ = new BehaviorSubject<boolean>(false);
    constructor(private apiService: ApiService) { }


    public getProfile(): boolean {
        this.profile = new Profile();
        this.isPending$.next(true);
        this.apiService.get<any>(BASE_URL).subscribe(
            res => {
                Object.assign(this.profile, res['data']);
                this.profile$.next(this.profile);
                this.isPending$.next(false);
                return true;
            },
            err => {
                this.isPending$.next(false);
            }
        )
        return false;
    }

    public saveProfileGeneral(prf: FormGroup) {
        if (!!this.profile.firstName) {
            return this.apiService.patch(BASE_URL, FormTools.getChangedValues(prf))
        } else {
            return this.apiService.post(BASE_URL, prf.value)
        }
    }

    public saveProfileContact(prf: FormGroup) {
        if (this.profile.contacts.length>0) {
            return this.apiService.patch(`${BASE_URL}/contact/${this.profile.contacts[0].id}`, FormTools.getChangedValues(prf))
        }else{
            return this.apiService.post(`${BASE_URL}/contact`, prf.value)
        }
    }

    public saveProfileAvatar(source) {
        var fd = new FormData();
        fd.append('imageFile', source);
        return this.apiService.post(`${BASE_URL}/avatar`, fd)
    }

    public removeAvatar() {
        return this.apiService.delete(`${BASE_URL}/avatar/${this.profile.avatar.id}`)
    }
}
