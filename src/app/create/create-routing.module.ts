import { CreateComponent } from './create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: CreateComponent,
    data:{
      title: "创建会议"
    }
  },
  {
    path: ":id",
    component: CreateComponent,
    data:{
      title: "编辑会议"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }
