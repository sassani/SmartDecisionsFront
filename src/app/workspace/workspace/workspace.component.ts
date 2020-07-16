import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Credential } from '../../_models/credential';

@Component({
    selector: 'workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
    cr: Credential = new Credential
    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.credential$.subscribe(cr => {
            this.cr = cr;
        });
        // console.log('this.cr', this.cr);
    }

}
