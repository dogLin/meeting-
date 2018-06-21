import { PopService } from './../services/pop.service';
import { MeetingService } from './../services/meeting.service';
import { isToday } from 'date-fns';
import { ApiService } from './../services/api.service';
import { HttpService } from './../core/service/http.service';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  meetingList
  type = {
    sub: 0,
    ing: 0,
    end: 0,
    cancle: 0
  }
  constructor(
    private api: ApiService,
    private meetService: MeetingService,
    private pop: PopService
  ) {

  }

  ngOnInit() {
    this.init()
  }

  init(){
    this.meetService.getMeeting({}).subscribe(res => {
      console.log(res)
      this.meetingList = res.data;
      this.meetingList = this.meetingList.filter(meeting => {
        switch (meeting.status) {
          case '预约':
            this.type.sub++;
            break
          case '进行中':
            this.type.ing++;
            break
          case '已结束':
            this.type.end++;
            break
          case '已取消':
            this.type.cancle++;
            break
        }
        console.log(isToday(meeting.startTime))
        if ( !isToday(meeting.startTime)) {
          return false
        }
        return true
      })
    })
  }

  showUsers(_id) {
    this.pop.openMeetMembersDialog(_id);
  }
}
