import { RotarySwitchComponent } from './/rotary-switch/rotary-switch.component';
import { ShareModule } from './../share/share.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices.component';
import { ConfigMacComponent } from './config-mac/config-mac.component';
import { EqComponent } from './eq/eq.component';
import { NgxEchartsModule } from "ngx-echarts";
import { EqBoardComponent } from './eq-board/eq-board.component';
import { NumInputComponent } from './num-input/num-input.component';
import { CameraManaComponent } from './camera-mana/camera-mana.component'

@NgModule({
  imports: [
    CommonModule,
    DevicesRoutingModule,
    ShareModule,
    NgxEchartsModule,

  ],
  declarations: [DevicesComponent, ConfigMacComponent, EqComponent, EqBoardComponent, NumInputComponent,RotarySwitchComponent, CameraManaComponent],
  entryComponents: [
    ConfigMacComponent
  ]
})
export class DevicesModule { }
