import { UserService } from './../core/service/user.service';
import { ApiService } from './api.service';
import { UserListComponent } from './../share/components/user-list/user-list.component';
import { MatDialog } from '@angular/material';
import { UtilService } from './util.service';
import { HttpService } from './../core/service/http.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { differenceInMinutes } from 'date-fns';

@Injectable()
export class MeetingService {
  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private userService: UserService
  ) { }


  /**
   * 获取会议
   */
  getMeeting(params: any = {}) {
    return this.api.getMeeting(params).pipe(
      map(res => {
        res.data.map(meeting => {
          let userId = this.userService.getCurrentUser()._id
          // 获取会议的发起人
          meeting.starter = meeting.members.find(men => men.isStarter)
          // 确认参加人数
          meeting.confirmLength = meeting.members.filter(item => {
            if (item.userId._id == userId) {
              meeting.userStatus = item
            }
            return item.isJoin
          }).length
          // 未确认参加的人数
          meeting.unConfirmLength = meeting.members.length - meeting.confirmLength
          // 当前用户是否是发起人
          meeting.isStarter = (userId == meeting.starter.userId._id)

          meeting.minute = differenceInMinutes(meeting.endTime, meeting.startTime)
          // 判断投票是否表决过
          meeting.votes.map(vote => {
            vote.voted = false
            vote.options.map(option => {
              if (!vote.voted) {
                let user = option.voter.find(user => user.user == userId)
                if (user) {
                  vote.voted = true;
                }
              }
            })
          })
        })
        return res;
      })
    )
  }

  /**
   * 开始会议
   * @param meet
   */
  beginMeeting(meet) {
    return this.api.startMeeting(
      {meetingId: meet._id}
    ).subscribe(res => {
      meet.status = '进行中'
    })
  }

  /**
   * 确认参加会议
   * @param meet
   */
  joinMeet(meet) {
    return this.api.joinMeeting({
      meetingId: meet._id
    }).subscribe(
      res => {
        meet.userStatus.isJoin = true
      }
    )
  }

  /**
   * 取消会议
   * @param meet
   */
  cancleMeeting(meet, call) {
    let status = meet.status;
    meet.status = '已取消'
    return this.api.updateMeeting({
      _id: meet._id,
      status: meet.status
    }).subscribe(
      res => {
        if (res.success) {
          call()
        } else {
          meet.status = status
        }
      },
      err => {
        meet.status = status
      }
    )
  }

  /**
    * 结束会议
    * @param meet
    */
  endMeeting(meet, call) {
    return this.api.endMeeting(
      {meetingId: meet._id}
    ).subscribe(res => {
      meet.status = '已结束'
      call()
    })
  }

  /**
   * 删除会议
   * @param id
   */
  deleteMeet(id) {
    return this.api.delMeet(id)
  }


  /**
   * 修改会议纪要
   */
  modifyMinutes(meet) {
    let meeting = {
      _id: meet._id,
      minutes: meet.minutes
    }
    return this.api.updateMeeting(meeting).subscribe(
    )
  }

  /**
   * 上传会议附件
   * @param _id 会议Id
   * @param file 附件
   */
  uploadAttachment(_id, file) {
    let form = new FormData()
    form.append("meetingId", _id)
    form.append('file',file)
    return this.api.uploadAttachment(form);
  }

  /**
   * 删除会议附件
   * @param meet
   * @param file
   */
  deleteFile(meet,file) {
    let meeting = {
      _id: meet._id,
      files: meet.files.filter( item => item._id !== file._id )
    }
    return this.api.updateMeeting(meeting)
  }

  /**
   * 会议签到
   * @param meet
   * @param mac 用户对应设备的发言单元
   */
  meetSign(meet) {
    console.log(meet);
    let mac = this.getMac(meet)
    return this.api.meetSign({
      "meetingId": meet._id,
      "signTime": new Date(),
      mac
    }).subscribe(
      res => {
        if (res.success) {
          meet.userStatus.isSign = true
        }
      }
      )
  }

  /**
   * 获取当前用户的mac
   * @param meet
   */
  getMac(meet) {
    let user = this.userService.getCurrentUser();
    user = meet.members.find(u => u.userId._id == user._id)
    let mac = ''
    if (user.device && user.device.mac) {
      mac = user.device.mac
    }
    return mac
  }

  /**
   * 发起表决
   * @param id 会议id
   * @param vote 表决
   */
  startMeetVote(id, voteContent) {
    return this.api.startMeetVote({
      meetingId: id,
      voteContent
    })
  }

  /**
   * 投票
   * @param vote 表决
   * @param optionId 选项ID
   */
  vote(meet,vote, optionId) {
    let mac = this.getMac(meet);
    let command = vote.options.map(item => item._id).indexOf(optionId) == 0
    return this.api.vote({
      voteId: vote._id,
      optionId,
      mac,
      command
    })
  }

  /**
   * 获取所有可见会议室的所有会议
   * @param date
   */
  getRoomAllMeet(date) {
    return this.api.getRoomAllMeeting({ date }).pipe(
      map(res => {
        res.data.map(room => {
          room.meetings.map(meeting => {
            // 获取会议的发起人
            meeting.starter = meeting.members.find(men => men.isStarter)
          })
        })
        return res;
      })
    )
  }

  /**
   * 结束投票
   * @param meetingId
   * @param voteId
   */
  endVote(meetingId, voteId) {
    return this.api.endVote({
      meetingId, voteId
    })
  }
}



