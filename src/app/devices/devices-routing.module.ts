import { CameraManaComponent } from './camera-mana/camera-mana.component';
import { EqComponent } from './eq/eq.component';
import { DevicesComponent } from './devices.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DevicesComponent,
    data:{
      title: "设备管理"
    }
  },
  {
    path: 'eq/:id',
    component: EqComponent,
    data:{
      title: "设备管理>EQ调音"
    }
  },
  {
    path: "cameraMana",
    component: CameraManaComponent,
    data:{
      title: "设备管理>摄像管理"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
