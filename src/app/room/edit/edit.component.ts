import { DeviceService } from './../../services/device.service';
import { map } from 'rxjs/operators/map';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from './../../services/util.service';
import { ApiService } from './../../services/api.service';
import { ChooseUserComponent } from './../../share/components/choose-user/choose-user.component';
import { Router, Route, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators'
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  host: {
    '[class.right_content]': "true",
  }
})
export class EditComponent implements OnInit {
  val = false
  title: string = '新增会议室'
  type ="add"
  file;
  room: any = {
    name: '测试会议室',
    type: '通用',
    place: 'D502',
    desc: '这是一个测试会议室',
    holdNums: 50,
    openUsers: [],
    devices: [],
    avatar: ''
  };
  ifHost = false
  hostList = []

  hostId;
  types = [
    {
      type: "通用",
      value: '通用'
    },
    {
      type: "指定人员",
      value: '指定人员开放'
    }
  ]

  $addRoom: Observable<any>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private apiService: ApiService,
    private util: UtilService,
    private toastr: ToastrService,
    private deviceService: DeviceService,
    public location: Location
  ) {
    // 编辑
    if (router.url.includes("edit")) {
      this.type = 'edit'
      this.title = '编辑会议室'
      this.route.queryParamMap.pipe(
        map((params) => {
          return params.get("room")
        })
      )
      .subscribe(
        res => {
          this.room = JSON.parse(res)
          this.ifHost = this.room.devices.length > 0
          if (this.ifHost) {
            this.hostId = this.room.devices[0]
          }
        }
      )
    }
  }

  ngOnInit() {
    this.deviceService.getDeviceByType("host").subscribe(
      res => {
        console.log(res.data)
        this.hostList = res.data
      }
    )
  }

  /**
   * 选择开放人员
   */
  chooseUser() {
    this.dialog.open(ChooseUserComponent, {
      data: this.room.openUsers
    })
    .afterClosed()
    .subscribe(users => {
      this.room.openUsers = users
    })
  }

  /**
   * 图片改变
   */
  fileChange(e) {
    console.log(e)
    this.file = e.target.files[0];
    let reader = new FileReader();
    let url = reader.readAsDataURL(this.file);
    let that = this
    reader.onload = ((e) => {
      console.log(e)
      this.room.avatar = reader.result
    })
  }

  create() {
    let validate = this.util.validation(this.room,[
      {
        prop: 'name',
        label: '会议室名称'
      },
      {
        prop: 'holdNums',
        label: '会议室座位'
      },
      {
        prop: 'place',
        label: '会议室地址'
      },
      {
        prop: 'avatar',
        label: '简图'
      },
    ])
    if (!validate) { return }
    if (this.room.type == '指定人员' && (!this.room.openUsers || this.room.openUsers.length <= 0)) {
      return this.toastr.error("错误","请选择指定人员")
    }
    let skip = ["avatar","_id", "meetings"]
    let formData = new FormData();
    if(this.file) {
      formData.append("file",this.file)
    }

    if (this.hostId && this.ifHost) {
      this.room.devices = [this.hostId]
    }
    // 组件formDate
    for ( let key in this.room) {
      let value = this.room[key]
      if(skip.indexOf(key) < 0 && value && ( !(value instanceof Array) ||  value.length > 0)) {
        if (key == 'openUsers') {
          value = value.map(item => item._id)
          formData.append(key,JSON.stringify(value))
        } else if (key == 'devices'){
          formData.append(key,JSON.stringify(value))
        }else{
          formData.append(key,value)
        }
      }
    }
    // 是否编辑
    if (this.type == 'edit') {
      this.apiService.editMeetingRoom(this.room._id, formData).subscribe(res => {
        this.router.navigate(["/room/mana"]);
      })
    } else {

      this.apiService.postMeetingRoom(formData).subscribe(res => {
        this.router.navigate(["/room/mana"]);
      })
    }
  }
}
