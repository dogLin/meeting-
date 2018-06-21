import { MeetingService } from './../../services/meeting.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-add-vote',
  templateUrl: './add-vote.component.html',
  styleUrls: ['./add-vote.component.scss']
})

export class AddVoteComponent implements OnInit {
  vote = {
    name: '',
    options: [
      {
        caption: "是"
      },
      {
        caption: "否"
      }
    ]
  }
  constructor(
    private dialogRef: MatDialogRef<AddVoteComponent>,
    private total: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private meetService: MeetingService
  ) { }

  ngOnInit() {
  }

  close(data = null) {
    if (!data) {
      return this.dialogRef.close();
    }
    if (data && !data.name) {
      return this.total.error("表决主题不能为空!", "错误")
    }
    console.log(this.data)
    this.meetService.startMeetVote(this.data,this.vote).subscribe(
      res => {
        if (res.success) {
          this.dialogRef.close(true)
        }
      }
    )
  }

}
