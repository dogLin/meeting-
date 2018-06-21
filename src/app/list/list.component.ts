import { ActivatedRoute } from '@angular/router';
import { PopService } from './../services/pop.service';
import { MeetingService } from './../services/meeting.service';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { isToday, differenceInCalendarDays } from 'date-fns';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  host: {
    '[class.right_content]': "true",
  }
})
export class ListComponent implements OnInit {
  avatar = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523876534272&di=d982b8cdd0f66cf966059047c12ff6b3&imgtype=0&src=http%3A%2F%2Fpic.35pic.com%2Fnormal%2F08%2F15%2F02%2F8006750_150727016394_2.jpg'
  datas = [
    { _id: '1', state: "预约" }, { _id: '1', state: "进行中" }, { _id: '1', state: "未进行" },
    { _id: '1', state: "预约" }, { _id: '1', state: "进行中" }, { _id: '1', state: "未进行" },
    { _id: '1', state: "预约" }, { _id: '1', state: "进行中" }, { _id: '1', state: "未进行" },
  ];

  day = new Date();
  journeyList = [];
  meetingList = []

  showList = [];
  types = [
    '预约', '进行中', "已结束", '已取消', "未进行"
  ]
  typeIndex = 0
  selectedIndex = 1
  constructor(
    private _sanitizer: DomSanitizer,
    private api: ApiService,
    public meetService: MeetingService,
    public pop: PopService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.selectedIndex = this.types.indexOf(this.route.snapshot.paramMap.get("type"))
    this.selectedIndex >= 0? '': this.selectedIndex = 0
    this.typeIndex = this.selectedIndex
    console.log(this.typeIndex)
    this.meetService.getMeeting().subscribe(res => {
      this.meetingList = res.data;
      this.updateJourneyList();
      this.updateShowList(this.types[this.typeIndex])
    })
  }

  /**
   * 更新日程表
   */
  updateJourneyList() {
    this.journeyList = this.meetingList.filter(item => differenceInCalendarDays(this.day, item.startTime) == 0)
      .sort((a, b) => {
        let c = Number(new Date(a.startTime)) - Number(new Date(b.startTime))
        return c;
      })
  }

  updateShowList(type) {
    this.showList = []
    setTimeout(() => {
      this.showList = this.meetingList.filter(item => item.status == type)
      .sort((a, b) => {
        let c = Number(new Date(a.startTime)) - Number(new Date(b.startTime))
        return c;
      })
    }, 200);
  }


  /**
   * 日期变换
   * @param e
   */
  dateChange(e) {
    console.log(e)
    this.day = e.target.value;
    this.updateJourneyList();
  }

  switchColor(data) {
    if (data.status == "预约") {
      return this._sanitizer.bypassSecurityTrustStyle("#7CD5A7");
    }
    if (data.status == "进行中") {
      return this._sanitizer.bypassSecurityTrustStyle("#FE7156");

    }
    if (data.status == "未进行" || data.status == "已取消") {
      return this._sanitizer.bypassSecurityTrustStyle("#F9C22D");
    }
    if (data.status == "已结束") {
      return this._sanitizer.bypassSecurityTrustStyle("#6BA9FF");
    }
  }

  tabChange(e) {
    this.updateShowList(this.types[e])
  }

  deleteMeet(item) {
    this.pop.openConfirm().afterClosed().subscribe(
      res => {
        if (res) {
          this.meetService.deleteMeet(item._id).subscribe(
            res => {
                this.ngOnInit()
            }
          )
        }
      }
    )
  }
}
