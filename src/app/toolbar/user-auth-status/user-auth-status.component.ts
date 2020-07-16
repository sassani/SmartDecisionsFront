import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Credential } from '../../_models/credential';
import { CredentialService } from 'src/app/_services/credential.service';
import { ProfileService } from 'src/app/_services/profile.service';
import { Profile } from 'src/app/_models/profile';
import { map } from 'rxjs/operators';

@Component({
    selector: 'user-auth-status',
    templateUrl: './user-auth-status.component.html',
    styleUrls: ['./user-auth-status.component.css']
})
export class UserAuthStatusComponent implements OnInit {
    // private autoGrabber;
    credential: Credential = new Credential();
    broadCast: BroadcastChannel = new BroadcastChannel('smartDecisionChanel');
    requestProfile: boolean = false;
    lastCredentialId: string = null;
    profile: Profile = null;


    constructor(
        private authService: AuthService,
        private crdService: CredentialService,
        private prfService: ProfileService
    ) { }

    ngOnInit() {
        // this.prfService.profile$.subscribe(prf => this.credential.Profile = prf)

        this.authService.credential$.subscribe(cr => this.credential = cr)
        // (cr) => {
        //     this.credential = cr;
        //     // this.runAutoGrabber();
        //     if (cr.IsAuthenticated && this.lastCredentialId != cr.PublicId) {
        //         this.requestProfile = this.prfService.fechtProfileApi();
        //         this.lastCredentialId = cr.PublicId;
        //     }
        // });

        this.prfService.profile$.subscribe(val => {
            // console.log('profile subscribes from toolbar')
            this.profile = new Profile();
            // this.isloading = false;
            this.profile = Object.assign(this.profile, val);
            // this.initiateForm()
        });

        if (!this.credential.IsAuthenticated) this.authService.authoAuthenticate();
        this.broadCast.onmessage = ev => {
            this.authService.setEmailVerified()
            // this.authService.credential.IsEmailVerified = ev.data['isEmailVerified'];
            // console.log('ev: ', ev.data['isEmailVerified'])
        };
    }

    runAutoGrabber() {
        var i = 0;
        var autoGrabber = setInterval(() => {
            if (this.credential.IsAuthenticated) {
                this.crdService.baseInfo().subscribe(
                    res => {
                        // console.log('data', res['data']);
                    }
                );
            } else {
                clearInterval(autoGrabber);
            }
        }, 30 * 1000);

    }
}

