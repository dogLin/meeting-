import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() size = "";
  @Input() src = './images/avatar.jpg';
  @Input() type = "rect";
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (!this.src) {
      this.src = './images/avatar.jpg'
    }
  }
}
