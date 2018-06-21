import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-room-avatar',
  templateUrl: './room-avatar.component.html',
  styleUrls: ['./room-avatar.component.scss'],
  host: {
    '[class.block]':'true'
  }
})
export class RoomAvatarComponent implements OnInit {

  @Input()
  room
  constructor(

  ) {

  }

  ngOnInit(
  ) {
  }

}
