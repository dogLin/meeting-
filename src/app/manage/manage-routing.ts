import { AuthGuard } from './../auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: "app/home/home.module#HomeModule"
          },
          {
            path: 'home',
            loadChildren: "app/home/home.module#HomeModule"
          },
          {
            path: 'create',
            loadChildren: "app/create/create.module#CreateModule"
          },
          // {
          //   path: 'edit/:id',
          //   loadChildren: "app/create/create.module#CreateModule"
          // },
          {
            path: 'meeting',
            loadChildren: "app/list/list.module#ListModule"
          },
          {
            path: 'room',
            loadChildren: "app/room/room.module#RoomModule"
          },
          {
            path: 'musics',
            loadChildren: "app/musics/musics.module#MusicsModule"
          },
          {
            path: 'devices',
            loadChildren: "app/devices/devices.module#DevicesModule"
          }
        ]
      }
    ]
  }

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
