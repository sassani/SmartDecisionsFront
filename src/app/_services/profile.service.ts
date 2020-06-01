import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Profile } from '../_models/profile';
import { BehaviorSubject } from 'rxjs';
import { tap, share } from 'rxjs/operators';


const BASE_URL = 'api/profile';


@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    public profile$ = new BehaviorSubject<Profile>(new Profile());
    constructor(private apiService: ApiService) { }


    public fechtProfileApi(): boolean {
        // return this.apiService.get<any>(BASE_URL).pipe(
        //     tap(
        //         res => {
        //             this.profile$.next(Object.assign(Profile, res['data']));
        //         }
        //     ),
        //     share()
        // )
        this.apiService.get<any>(BASE_URL).subscribe(
            res => {
                this.profile$.next(Object.assign(Profile, res['data']));
                return true;
            }
        )
        return false;
    }
}
