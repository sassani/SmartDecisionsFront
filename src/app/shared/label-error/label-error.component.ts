import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'label-error',
  templateUrl: './label-error.component.html',
  styleUrls: ['./label-error.component.css']
})
export class LabelErrorComponent implements OnChanges {

    @Input()errors:[Error];
    @Input()control:FormControl;
    
  constructor() { }

  ngOnChanges(): void {
    //   console.log('NgOnChange');
      console.log('control', this.control);
  }
  

}
