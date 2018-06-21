import { MeetingService } from './../../../services/meeting.service';
import { ApiService } from './../../../services/api.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  members
  allMembers
  cofirmJoins
  unCofirmJoins
  signs
  unSigns
  constructor(
    private dialog: MatDialogRef<UserListComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private api: ApiService,
    private meet:MeetingService
  ) {
    if (data) {
      this.api.getMeeting({_id:data}).subscribe(
        res => {
          this.members = res.data[0].members
          this.allMembers = res.data[0].members
          this.cofirmJoins = this.members.filter(item => item.isJoin)
          this.unCofirmJoins = this.members.filter(item => !item.isJoin)
          this.signs = this.members.filter(item => item.isSign)
          this.unSigns = this.members.filter(item => !item.isSign)
          console.log(this.members)
        }
      )
    }
  }

  ngOnInit() {
  }

  close() {
    this.dialog.close();
  }
}
