import { AddVoteComponent } from './../list/add-vote/add-vote.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TimepickerComponent } from './components/timepicker/timepicker.component';
import { RoomAvatarComponent } from './components/room-avatar/room-avatar.component';
import { ChooseUserComponent } from './components/choose-user/choose-user.component';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { PopOutComponent } from './components/pop-out/pop-out.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { MaterialModule } from './modules/material.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

import { HttpClientModule } from '@angular/common/http';
import { ElModule } from 'element-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    ElModule.forRoot(),
  ],
  declarations: [
    AvatarComponent,
    PopOutComponent,
    DeleteConfirmComponent,
    ChooseUserComponent,
    RoomAvatarComponent,
    TimepickerComponent,
    UserListComponent,
    AddVoteComponent

  ],
  entryComponents: [
    DeleteConfirmComponent,
    ChooseUserComponent,
    UserListComponent,
    AddVoteComponent
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    AvatarComponent,
    ReactiveFormsModule,
    PopOutComponent,
    DeleteConfirmComponent,
    ChooseUserComponent,
    RoomAvatarComponent,
    ElModule,
    TimepickerComponent,
    UserListComponent,
    AddVoteComponent
  ],
})
export class ShareModule { }
