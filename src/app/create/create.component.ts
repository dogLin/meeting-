import { environment } from './../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from './../services/device.service';
import { MeetingService } from './../services/meeting.service';
import { switchMap, filter } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../core/service/user.service';
import { ChooseUserComponent } from './../share/components/choose-user/choose-user.component';
import { ApiService } from './../services/api.service';
import { UtilService } from './../services/util.service';
import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher, MatDialog } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { isToday, format, differenceInMinutes } from 'date-fns'
import { Location } from '@angular/common';


@Component({
  selector: 'app-creat',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  // styles: ["flex-grow"],
  host: {
    '[class.right_content]': "true",
  }
})
export class CreateComponent implements OnInit {

  // 开始时间日期
  day
  // 开始时间
  startTime
  // 结束时间
  endTime
  // 开始时间的可选项
  beginTimeList
  // 结束时间的可选项
  endTimeList
  // 会议室列表（显示用）
  roomList = []
  // 所有会议室
  allRoomList = []
  // 显示会议室的下标
  roomIndex = 0
  // 显示会议室的数量
  showNum = 5;
  // 会议室
  meeting: any = {
    name: '',
    meetingRoom: '',
    desc: '',
    startTime: null,
    endTime: null,
    members: [],
    issues: []
  }
  // 可选会议室的查询条件流
  $querys: Subject<any> = new Subject()
  // 时间以timeInter分钟为间隔
  timeInter = 1
  endTimeInter = 15;
  // 当前是新建还是编辑
  type = 'create'
  // 发言单元列表
  unitList = []
  
  minDay = new Date() // 用来指定今日的日期,指定可选的最小日期

  BeginHour = environment.beginHour
  EndHour = environment.endHour

  constructor(
    private util: UtilService,
    private api: ApiService,
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private meetService: MeetingService,
    private deviceService: DeviceService,
    public location: Location,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    let currentUser = this.userService.getCurrentUser();
    this.meeting.members = [currentUser]
    this.day = new Date();
    // 初始化的时候获取所有会议室
    this.api.getMeetingRoom().subscribe(res => {
      this.allRoomList = res;
      this.roomList = this.allRoomList.slice(this.roomIndex, this.roomIndex + this.showNum);
      this.meeting.meetingRoom = this.roomList[0]._id
      this.changeRoom(this.roomList[0])
      console.log(this.meeting.meetingRoom)
    })

    // 监听查询会议室条线的流
    this.$querys.subscribe(query => {
      let option: any = {}
      this.getTimes();
      option.startTime = format(this.meeting.startTime, 'YYYY-MM-DD HH:mm:ss')
      option.endTime = format(this.meeting.endTime, 'YYYY-MM-DD HH:mm:ss')
      this.api.getUseableMeetRoom(option).subscribe(
        res => {
        console.log(res)
          this.allRoomList = res.data;
          if (this.meeting.meetingRoom && !res.data.some(room => room._id === this.meeting.meetingRoom)) {
            this.meeting.meetingRoom = ''
          }
          this.roomIndex = 0;
          this.updateRoom();
        }
      )
    })
    this.updateTimeList()
    let meet$ = this.route.paramMap.pipe(
      filter(params => Boolean(params.get('id'))),
      switchMap((params: any) => {
        let _id = params.get('id')
        return this.meetService.getMeeting({ _id })
      })
    )
    meet$.subscribe(res => {
      console.log("编辑")
      this.type = 'edit'
      this.meeting = res.data[0]
      this.day = new Date(this.meeting.startTime)
      this.startTime = format(this.meeting.startTime, "HH:mm")
      this.endTime = format(this.meeting.endTime, "HH:mm")
      this.updateTimeList()
      this.changeRoom(this.meeting.meetingRoom)
      this.meeting.members.map(men => {
        men._id = men.userId._id
        men.name = men.userId.name
        men.avatar = men.userId.avatar
      })
    })
  }

  /**
   * 开始时间改变
   * @param e
   */
  startChange(e) {
    let [hour, min] = this.startTime.split(':')
    this.endTimeList = this.getAllTimesOption(this.endTimeInter, Number(hour), Number(min) + 1);
    this.endTime = this.endTimeList[0]
    this.$querys.next('x')
  }

  /**
   * 监听结束时间改变
   * @param e
   */
  endChange(e) {
    this.$querys.next('x')
  }

  /**
   * 监听日期改变
   * @param e
   */
  dateChange(e) {
    console.log(e.value)
    if (isToday(e.value)) {
      this.day = new Date()
    } else {
      this.day = e.value
    }
    this.updateTimeList()
    this.$querys.next('x')
  }

  getAllTimesOption(interval, beginHour = this.BeginHour, beginMinutes=0) {
    return this.util.getAllTimesOption(interval, beginHour, beginMinutes, this.EndHour)
  }

  updateTimeList() {
    if (isToday(this.day) && this.day.getHours() >= this.BeginHour) {
      this.beginTimeList = this.getAllTimesOption(this.timeInter, this.day.getHours(), this.day.getMinutes());
      this.endTimeList = this.getAllTimesOption(this.endTimeInter, this.day.getHours(), this.day.getMinutes());
    } else {
      this.beginTimeList = this.getAllTimesOption(this.timeInter);
      this.endTimeList = this.getAllTimesOption(this.endTimeInter);
    }
  }

  /**
   * 前一个会议室
   */
  preRoom() {
    if (this.roomIndex == 0) {
      return
    }
    this.roomIndex--
    this.updateRoom()
  }

  /**
   * 下一个会议室
   */
  nextRoom() {
    if (this.roomIndex + this.showNum > this.allRoomList.length) {
      return
    }
    this.roomIndex++
    this.updateRoom()
  }

  /**
   * 更新显示的会议室
   */
  updateRoom() {
    this.roomList = this.allRoomList.slice(this.roomIndex, this.roomIndex + this.showNum)
  }

  /**
   * 选择用户
   */
  chooseUser() {
    let currentUser = this.userService.getCurrentUser();
    this.dialog.open(ChooseUserComponent, {
      data: this.meeting.members
    }).afterClosed().subscribe(
      users => {
        this.meeting.members = users.filter(u => u._id !== currentUser._id)
        this.meeting.members.unshift(currentUser)
      }
      )
  }

  /**
   * 格式化时间
   */
  getTimes() {
    if (this.startTime) {
      let [hour, min] = this.startTime.split(":")
      let date = new Date(this.day)
      date.setHours(hour)
      date.setMinutes(min)
      date.setSeconds(0)
      this.meeting.startTime = format(date, 'YYYY-MM-DD HH:mm:ss')
    } else {
      this.meeting.startTime = null
    }
    if (this.endTime) {
      let [hour, min] = this.endTime.split(":")
      let date = new Date(this.day)
      date.setHours(hour)
      date.setMinutes(min)
      date.setSeconds(0)
      this.meeting.endTime = format(date, 'YYYY-MM-DD HH:mm:ss')
    } else {
      this.meeting.endTime = null
    }
    console.log(this.meeting);
  }

  /**
   * 会议室改变
   * @param item
   */
  changeRoom(item) {

    this.meeting.meetingRoom = item._id
    if (item.devices && item.devices[0]) {
      let hostId = item.devices[0]
      this.deviceService.getDeviceById(hostId)
        .subscribe(res => {
          this.unitList = res.data[0].mic
        })
    } else {
      this.unitList = []
    }
  }

  /**
   * 创建会议
   */
  create() {
    console.log(this.meeting)

    if (!this.meeting.meetingRoom) {
      return this.toastr.error("请选择一个会议室","错误")
    }

    this.meeting.members = this.meeting.members.map((user: any, i) => {
      let u: any = {
        userId: user._id || user.userId,
      }
      if (this.unitList && this.unitList[i]) {
        u.device = this.unitList[i]._id
      }
      return u;
    });
    // 判断与会人员中是否有自己，没有的话添加上，有的话给他附上starter的属性

    let currentUser = this.userService.getCurrentUser();
    let a = this.meeting.members.find(user => user.userId == currentUser._id)
    if (a) {
      a.isStarter = true
      a.isJoin = true
    } else {
      this.meeting.members.push({
        userId: currentUser._id,
        isStarter: true,
        isJoin: true
      })
    }
    // this.meeting.minutes = differenceInMinutes(this.meeting.endTime , this.meeting.startTime)
    this.meeting.issues = this.meeting.issues.map(item => item.value)
    if (this.type == 'create') {
      this.api.postMeeting(this.meeting).subscribe(
        res => {
          console.log(res);
          if (res.success) {
            this.router.navigate(['/meeting'])
          }
        }
      )
    } else {
      this.api.updateMeeting(this.meeting).subscribe(
        res => {
          console.log(res);
          if (res.success) {
            this.router.navigate(['/meeting'])
          }
        }
      )
    }

  }
}
