import { Component, OnInit, Input } from '@angular/core';
import { IError } from 'src/app/_interfaces/IError';

@Component({
    selector: 'errors-list',
    templateUrl: './errors-list.component.html',
    styleUrls: ['./errors-list.component.css']
})
export class ErrorsListComponent implements OnInit {

    @Input()
    errors: IError[] = [];
    constructor() { }

    ngOnInit() {
    }

}
