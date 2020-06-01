import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';

@Component({
    selector: 'workspace-dashboard',
    templateUrl: './workspace-dashboard.component.html',
    styleUrls: ['./workspace-dashboard.component.css']
})
export class WorkspaceDashboardComponent implements OnInit {

    constructor(private apiService: ApiService) { }

    ngOnInit() {
    }
    testSecure() {
        this.apiService.get<any>("api/profile").subscribe(
            res => {
                console.log('res', res);
            }
        )
    }
}
