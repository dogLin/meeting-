import { EditComponent } from './edit/edit.component';
import { RoomManaComponent } from './room-mana/room-mana.component';
import { RoomComponent } from './room.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RoomComponent,
    data: {
      title: "会议室"
    }
  },
  {
    path: 'mana',
    component: RoomManaComponent,
    data: {
      title: "会议室>会议室管理"
    }
  },
  {
    path: 'edit',
    component: EditComponent,
    data: {
      title: "会议室>会议室编辑"
    }
  },
  {
    path: 'add',
    component: EditComponent,
    data: {
      title: "会议室>添加会议室"
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
