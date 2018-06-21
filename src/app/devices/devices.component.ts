import { Observable } from 'rxjs';
import { SocketService } from './../services/socket.service';
import { DeviceService } from './../services/device.service';
import { ConfigMacComponent } from './config-mac/config-mac.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  host: {
    '[class.right_content]': "true",
  }
})
export class DevicesComponent implements OnInit, OnDestroy {
  toneOper = 0
  voice = 50
  devices = []
  deviceChangeSub
  constructor(
    private dialog: MatDialog,
    private deviceService: DeviceService,
    private socket: SocketService
  ) { }

  ngOnInit() {
    this.init()
    this.deviceChangeSub = Observable.merge(this.socket.getSocket("devices"), this.socket.getSocket("speak"), this.socket.getSocket("quite"))
      .subscribe(
        data => {
          this.init()
        }
      )
  }

  ngOnDestroy(): void {
    this.deviceChangeSub.unsubscribe()
  }

  init() {
    this.deviceService.getDeviceByType("host").subscribe(
      res => {
        this.devices = res.data
      }
    )
  }

  config_mac(mac) {
    this.dialog.open(ConfigMacComponent, {
      data: mac
    })
  }

  /**
   * 指定主席台
   * @param item
   */
  appointROst(item) {
    this.deviceService.appointRost(item.mac).subscribe(
      res => {
        this.init()
      }
    )
  }

  /**
   * 模式转换
   * @param e
   */
  modeChange(e) {
    console.log(e.value)
    this.deviceService.switchModel(e.value).subscribe()
  }

  /**
   * 调音
   */
  tone() {
    this.deviceService.tone(this.toneOper, this.voice).subscribe()
  }

  /**
   * 禁言
   */
  prohibit() {
    this.deviceService.prohibt().subscribe(
      res => {
        this.init()
      }
    )
  }

  /**
   * 取消禁言
   */
  disProhibit() {
    this.deviceService.disProhibt().subscribe(
      res => {
        this.init()
      }
    )
  }

  toggleShut(device) {
    let oper = device.allowSpeak ? 0 : 1
    this.deviceService.speakUnitContorl(device.mac, oper).subscribe(
      res => {
        device.allowSpeak = !device.allowSpeak
      }
    )
  }
}
