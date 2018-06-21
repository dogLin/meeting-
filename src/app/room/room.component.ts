import { environment } from './../../environments/environment';
import { UserService } from './../core/service/user.service';
import { UtilService } from './../services/util.service';
import { MeetingService } from './../services/meeting.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format, differenceInMinutes, addDays, subDays } from 'date-fns';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  host: {
    '[class.right_content]': "true",
  }
})
export class RoomComponent implements OnInit {

  interVal = 60;
  timeList
  roomList
  day = new Date()
  user
  BeginHour = environment.beginHour
  EndHour = environment.endHour
  format = format
  constructor(
    private router: Router,
    private meetService: MeetingService,
    private util: UtilService,
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.init();
    this.user = this.userService.getCurrentUser();
  }

  init() {
    console.log(this.day)
    let headTime = new Date(this.day);
    headTime.setHours(this.BeginHour)
    headTime.setMinutes(0)
    headTime.setSeconds(0)
    console.log(headTime)

    this.meetService.getRoomAllMeet(format(this.day, "YYYY-MM-DD")).subscribe(
      res =>{
        console.log(res);
        this.roomList = res.data;
        this.roomList.map(room => {
          room.meetings.map(meet => {
            meet.width = differenceInMinutes(meet.endTime , meet.startTime) / this.interVal * 100 + "%"
            let dif = differenceInMinutes(meet.startTime, headTime);
            dif = Number((dif / this.interVal).toFixed(2))
            meet.left = this.sanitizer.bypassSecurityTrustStyle(`calc( ${dif*100}% + ${dif*1.6}px)`)
            console.log(meet.left )
          })
        })
      }
    )
    this.timeList = this.util.getAllTimesOption(this.interVal,this.BeginHour, 0 ,this.EndHour);
  }

  manaRoom() {
    this.router.navigate(['/room/mana'])
  }

  nextDay() {
    console.log(this.day)
    this.day = addDays(this.day,1)
    this.init()
  }

  preDay() {
    this.day = subDays(this.day,1)
    this.init()
  }

  dateChange() {
    this.init()
  }
}
