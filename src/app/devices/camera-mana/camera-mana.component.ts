import { DeviceService } from './../../services/device.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera-mana',
  templateUrl: './camera-mana.component.html',
  styleUrls: ['./camera-mana.component.scss'],
  host: {
    '[class.right_content]': "true",
  }
})
export class CameraManaComponent implements OnInit {
  devices = []
  positions = [
    {
      name: '位置1',
      mac:''
    },
    {
      name: '位置2',
      mac:''
    },
    {
      name: '位置3',
      mac:''
    },
    {
      name: '位置4',
      mac:''
    },
    {
      name: '位置5',
      mac:''
    },
    {
      name: '位置6',
      mac:''
    }
  ]
  constructor(
    private deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.init()
  }


  init() {
    this.deviceService.getDeviceByType("speakUnit").subscribe(res => {
      this.devices = res.data;
      console.log(this.devices);
      this.devices.map(item => {
        if (item.camera >= 0) {
          this.positions[item.camera].mac = item.mac
        }
      })
    })
  }

  deviceChange(pos, i) {
  }

  setCamera(pos,i) {
    this.deviceService.setUpCameraLo(i,pos.mac).subscribe(
      res => {
        this.init()
      }
    )
  }

  getCamera(pos,i) {
    this.deviceService.getCameraLo(i,pos.mac).subscribe(
      res => {
        this.init()
      }
    )
  }

  clearCamera(pos,i) {
    this.deviceService.delCameraLo(i,pos.mac).subscribe(
      res => {
        pos.mac = ''
        this.init()
      }
    )
  }

  move(type) {
    this.deviceService.moveCamera(type).subscribe()
  }

  stop() {
    this.deviceService.moveCamera("stop").subscribe()
  }
}
