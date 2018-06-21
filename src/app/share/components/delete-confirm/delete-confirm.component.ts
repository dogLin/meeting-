import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    if(!this.data) {
      this.data = {}
    }
   }

  ngOnInit() {
  }

  cancle() {
    this.dialogRef.close(false)
  }

  confirm() {
    this.dialogRef.close(true)
  }
}
