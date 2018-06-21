import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { DeleteConfirmComponent } from './../../share/components/delete-confirm/delete-confirm.component';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';

@Component({
  selector: 'app-room-mana',
  templateUrl: './room-mana.component.html',
  styleUrls: ['./room-mana.component.scss'],
  host: {
    '[class.right_content]': "true",
  }
})
export class RoomManaComponent implements OnInit {
  roomList = []
  displayedColumns = [
    "avatar", "name", "place", "host", "holdNums", "devices", "desc", "opt"
  ]

  dataSource = new MatTableDataSource(this.roomList)


  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRoomList();
  }

  /**
   * 获取会议室列表
   */
  getRoomList() {
    this.api.getAllMeetingRoom().subscribe(res => {
      this.roomList = res.msg
      this.updateTable();
    })
  }

  addRoom() {
    console.log("add room")
  }

  /**
   * 删除会议室
   * @param room 会议室
   * @param i 下表
   */
  deleteRoom(room,i) {
    this.dialog.open(DeleteConfirmComponent)
      .afterClosed()
      .subscribe(data => {
        console.log(data)
        if (data) {
          this.api.deleteMeetingRoom(room._id).subscribe(res => {
            this.roomList.splice(i,1);
            this.updateTable();
          })
        }
      })
  }

  /**
   * 编辑会议室
   * @param room 会议室
   */
  edit(room) {
    let navigationExtras = {
      queryParams: { 'room': JSON.stringify(room) },
    };
    this.router.navigate(["/room/edit/"], navigationExtras)
  }

  updateTable() {
    this.dataSource.data = this.roomList;
  }

  /**
   * 搜索
   * @param value
   */
  applyFilter(value) {
    value = value.trim();
    this.dataSource.filter = value;
  }
}
