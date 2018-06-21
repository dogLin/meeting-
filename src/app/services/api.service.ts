import { HttpService } from './../core/service/http.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { UserService } from '../core/service/user.service';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpService,
  ) {
  }



  /**
   * 获取会议
   * @param params
   */
  getMeeting(params:any = {}) {
    params = new HttpParams({
      fromObject: params
    })
    return this.http.get("/meeting",params)
  }
  /**
   *
   * @param meeting 创建会议
   */
  postMeeting(meeting) {
    return this.http.post('/meeting',meeting);
  }

  joinMeeting(body) {
    return this.http.post("/joinMeeting", body)
  }

  /***
   * 开始会议
   */
  startMeeting(body = {}) {
    return this.http.post("/startMeeting", body)
  }


  /***
   * 结束会议
   */
  endMeeting(body = {}) {
    return this.http.post("/endMeeting", body)
  }

  /**
   * 删除会议
   * @param id 会议id
   */
  delMeet(id) {
    return this.http.delete("/meeting/"+id)
  }

  /**
   * 更改会议
   * @param meeting 会议
   */
  updateMeeting(meeting) {
    delete meeting.__v
    let id = meeting._id;
    delete meeting._id
    return this.http.put("/meeting/"+id, meeting)
  }

  /**
   * 会议签到
   * @param body
   */
  meetSign(body) {
    return this.http.put("/meetingSign",body)
  }

  /**
   * 上传会议附件
   * @param body
   */
  uploadAttachment(body) {
    return this.http.post("/uploadAttachment", body)
  }

  /**
   * 发起表决
   * @param body
   */
  startMeetVote(body) {
    return this.http.post("/meetingVote",body)
  }

  /**
   * 表决
   * @param body
   */
  vote(body) {
    return this.http.post("/meetingUserVote",body)
  }


  /**
   * 获取可用的会议室
   * @param option 查询条件
   */
  getUseableMeetRoom(option) {
    let params = new HttpParams({
      fromObject: option
    })
    return this.http.get("/checkRoom",params)
  }

  /**
   * 获取会议室
   */
  getMeetingRoom() {
    return this.http.get('/meetingRoom').pipe(map(res => res.data))
  }

  /**
   * 获取所有会议室（公司的）
   */
  getAllMeetingRoom() {
    return this.http.get("/allMeetingRoom")
  }

  getRoomAllMeeting(option = {}) {
    let params = new HttpParams({
      fromObject: option
    })
    return this.http.get("/roomAllMeeting",params)
  }
  /**
   * 创建会议室
   * @param room 会议室表单
   */
  postMeetingRoom(room) {
    return this.http.post('/meetingRoom',room)
  }

  /**
   * 编辑会议室
   * @param id 会议室Id
   * @param room
   */
  editMeetingRoom(id,room) {
    return this.http.put('/meetingRoom/'+id,room)
  }

  /**
   * 删除会议室
   * @param id
   */
  deleteMeetingRoom(id) {
    return this.http.delete('/meetingRoom/'+id)
  }


  /**
   * 结束投票
   * @param body
   */
  endVote(body) {
    return this.http.post('/endMeetingVote',body)
  }

  /***
   * 获取所有设备
   */
  getAlldevices(option = {}) {
    let params = new HttpParams({
      fromObject: option
    })
    return this.http.get("/device",params)
  }

  /**
   * 指定主席台
   * @param body
   */
  appointRostrum(body) {
    return this.http.post("/appointRostrum", body)
  }

  /**
   * 切换发言模式
   * @param body
   */
  switchModel(body) {
    return this.http.post("/switchModel", body)
  }

  /**
   * 设备调音
   * @param body
   */
  tone(body) {
    return this.http.post("/tone", body)
  }

  /**
   * 禁言
   */
  prohibitAllSpeak() {
    return this.http.post("/prohibitAllSpeak")
  }

  /**
   * 取消禁言
   */
  permitAllSpeak() {
    return this.http.post("/permitAllSpeak")
  }

  /**
   * 发言单元控制
   * @param body
   */
  speakUnitContorl(body) {
    return this.http.post("/speakUnitContorl", body)
  }

  deviceConfig(body) {
    return this.http.post("/deviceConfigure",body)
  }

  /**
   * 移动摄像头
   * @param body
   */
  moveCamera(body) {
    return this.http.post("/cameraMove", body, false)
  }

  /**
   * 设置摄像头机位
   * @param body
   */
  setUpCameraLo(body) {
    return this.http.post("/setUpCameraLo", body)
  }

  /**
   * 调用摄像头机位
   * @param body
   */
  getCameraLo(body) {
    return this.http.post("/getCameraLo", body)
  }


  /**
   * 清空摄像头几位
   * @param body
   */
  delCameraLo(body) {
    return this.http.post("/delCameraLo", body)
  }


}
