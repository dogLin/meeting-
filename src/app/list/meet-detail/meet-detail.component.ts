import { ToastrService } from 'ngx-toastr';
import { SocketService } from './../../services/socket.service';
import { PopService } from './../../services/pop.service';
import { MeetingService } from './../../services/meeting.service';
import { UserService } from './../../core/service/user.service';
import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AddVoteComponent } from './../add-vote/add-vote.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-meet-detail',
  templateUrl: './meet-detail.component.html',
  styleUrls: ['./meet-detail.component.scss'],
  host: {
    '[class.right_content]': "true",
  }
})
export class MeetDetailComponent implements OnInit {
  meeting: any;
  ifStarter: string
  files: Array<File> = [];



  canStart = false
  meetId
  userVoteSub
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private api: ApiService,
    private meetService: MeetingService,
    private pop: PopService,
    private socket: SocketService,
    private toastr: ToastrService
  ) {
    this.route.paramMap.pipe(
      map((params: any) =>
        params.get('id')
      )
    ).subscribe(res => {
      this.meetId = res;
      this.init()
    })
  }

  ngOnInit() {
    setInterval(() => {
      this.canStart = Number(new Date(this.meeting.startTime)) - Number(new Date()) <= 0
    }, 1000)
    this.userVoteSub = this.socket.getSocket("vote").subscribe(
      data => this.init()
    )
  }

  ngOnDestroy(): void {
    this.userVoteSub.unsubscribe()
  }


  init() {
    this.meetService.getMeeting({ _id: this.meetId }).subscribe(
      res => {
        this.meeting = res.data[0]
        console.log(this.meeting)
        this.canStart = Number(new Date(this.meeting.startTime)) - Number(new Date()) <= 0
      }
    )
  }


  /**
   * 发起表决
   */
  addVote() {
    let a = this.meeting.votes.find(vote => vote.status == '进行中')
    if (a) {
      this.pop.openConfirm('确定发起投票', "当前有正在进行中的表决，是否要强制结束并发起新的投票")
        .afterClosed().subscribe(res => {
          if (res) {
            this.pop.openVoteDialog(this.meeting._id).afterClosed()
              .subscribe(res => {
                if (res) {
                  this.init()
                }
              })
          }
        })
    } else {
      this.pop.openVoteDialog(this.meeting._id).afterClosed()
        .subscribe(res => {
          if (res) {
            this.init()
          }
        })
    }
  }

  /**
   * 删除文件
   * @param file
   * @param i
   */
  deleteFile(file, i) {
    this.meetService.deleteFile(this.meeting, file)
      .subscribe(res => {
        if (res.success) {
          this.init();
        }
      })
  }

  /**
   * 上传文件
   * @param e
   */
  fileChange(e) {
    let file = e.target.files[0]
    if (e.target.files[0]) {
      this.meetService.uploadAttachment(this.meeting._id, file)
        .subscribe(res => {
          console.log(res)
          this.init()
        })
    }
  }

  /**
   * 查看用户的状态
   */
  showUsers() {
    this.pop.openMeetMembersDialog(this.meeting._id)
  }

  /**
   * 会议开始
   */
  begin() {
    this.meetService.beginMeeting(this.meeting);
  }

  /**
   * 会议签到
   */
  sign() {
    this.meetService.meetSign(this.meeting);
  }

  joinMeet() {
    this.meetService.joinMeet(this.meeting)
  }

  /***
   * 用户投票
   */
  userVote(vote) {
    if (!vote.selected) {
      return this.toastr.error("请选择表决选项", "错误")
    }
    this.meetService.vote(this.meeting, vote, vote.selected).subscribe(
      res => {
        this.init()
      }
    )
  }

  /**
   * 取消会议
   */
  cancleMeet() {
    this.pop.openConfirm('确定取消该会议？', "是否确定取消该会议").afterClosed()
      .subscribe(res => {
        if (res) {
          this.meetService.cancleMeeting(this.meeting, () => {
            // this.init()
          })
        }
      })
  }

  /***
   * 结束会议
   */
  endMeet() {
    this.pop.openConfirm('确定结束该会议？', "是否确定结束该会议").afterClosed()
      .subscribe(res => {
        if (res) {
          this.meetService.endMeeting(this.meeting, () => {
            // this.init()
          })
        }
      })
  }

  /**
   * 修改纪要
   */
  modifyMinutes() {
    this.meetService.modifyMinutes(this.meeting);
  }

  /**
   * 结束表决
   * @param vote
   */
  endVote(vote) {
    this.pop.openConfirm("确定结束表决", "确定结束当前表决")
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.meetService.endVote(this.meeting._id, vote._id).subscribe(
            res => {
              this.init();
            }
          )
        }
      })
  }

}
