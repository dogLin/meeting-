import { DeviceService } from './../../services/device.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-config-mac',
  templateUrl: './config-mac.component.html',
  styleUrls: ['./config-mac.component.scss']
})
export class ConfigMacComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<ConfigMacComponent>,
    @Inject(MAT_DIALOG_DATA) public mac: any,
    private deviceService: DeviceService
  ) {
    console.log(mac)
  }

  ngOnInit() {
  }

  cancle() {
    this.dialog.close()
  }

  confirm() {
    this.deviceService.deviceConfig(this.mac).subscribe(res => {
      if (res.success) {
        this.dialog.close()
      }
    })
  }
}
