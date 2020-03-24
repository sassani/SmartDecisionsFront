import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
    @Input()
    message:string;
    icon:string;
  constructor() { }

  ngOnInit() {
  }

}
