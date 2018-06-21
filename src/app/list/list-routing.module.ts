import { MeetDetailComponent } from './meet-detail/meet-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list.component';

const routes: Routes = [
  {
    path: "",
    component: ListComponent,
    data:{
      title: "会议列表"
    }
  },
  {
    path: ":type",
    component: ListComponent,
    data:{
      title: "会议列表"
    }
  },
  {
    path: "detail/:id",
    component: MeetDetailComponent,
    data:{
      title: "会议列表>会议详情"
    }
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
