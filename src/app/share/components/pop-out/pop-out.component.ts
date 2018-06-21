import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-out',
  templateUrl: './pop-out.component.html',
  styleUrls: ['./pop-out.component.scss']
})
export class PopOutComponent implements OnInit {

  @Input() titleText;
  @Input() disabled;
  @Output() cancle: EventEmitter<any> = new EventEmitter<any>();
  @Output() confirm: EventEmitter<any> = new EventEmitter<any>();
  @Input() width;
  @Input() confirmMsg;



  constructor() { }

  ngOnInit() {
  }

  close() {
    this.cancle.emit();
  }

  doConfirm() {
    this.confirm.emit();
  }

}
