import { DeleteConfirmComponent } from './../share/components/delete-confirm/delete-confirm.component';
import { AddVoteComponent } from './../list/add-vote/add-vote.component';
import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { UserListComponent } from '../share/components/user-list/user-list.component';

@Injectable()
export class PopService {
  constructor(
    private dialog: MatDialog
  ){}

  /**
   * 显示与会人员
   * @param _id 会议Id
   */
  openMeetMembersDialog(_id) {
    return this.dialog.open(UserListComponent, {
      data: _id,
      height: "650px"
    })
  }

  /**
   * 发起表决
   * @param meet
   */
  openVoteDialog(id) {
    return this.dialog.open(
      AddVoteComponent,{
        data: id
      }
    )
  }

  openConfirm(title=null, msg=null) {
    return this.dialog.open(DeleteConfirmComponent,{
      data:{title, msg}
    })
  }
}
