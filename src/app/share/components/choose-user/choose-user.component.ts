import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from './../../../core/service/user.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-choose-user',
  templateUrl: './choose-user.component.html',
  styleUrls: ['./choose-user.component.scss']
})
export class ChooseUserComponent implements OnInit {

  deptUsers
  showList
  checkList = [];
  constructor(
    private userService: UserService,
    private dialog: MatDialogRef<ChooseUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userService.getAllUser().subscribe(
      users => {
        this.deptUsers = users.reverse()
        this.showList = this.deptUsers
        console.log(this.showList)
        let checkedIds = data.map(item => item._id);
        this.initCheckUser(this.deptUsers, checkedIds)
      }
    )
  }

  ngOnInit() {
    // console.log(this.showList)
  }

  /**
   * 初始化选中的用户
   * @param dept 部门列表
   * @param ids 选中用户的id
   */
  initCheckUser(depts,ids) {
    depts.map(item => {
      item.members.map(user => {
        if(ids.indexOf(user._id) >=0) {
          user.checked = true
          this.checkList.push(user)
        }
      })
      if(item.children) {
        this.initCheckUser(item.children, ids)
      }
    })
  }


  reInit() {
    this.showList = this.deptUsers
  }
  next(dept) {
    if(dept.checked) {
      return
    }
    if (dept.children) {
      this.showList = dept.members.concat(dept.children)
    } else {
      this.showList = dept.members
    }
  }

  checkChange(e,item) {
    console.log(e)
    if(e.checked) {
      this.checkList.push(item);
    } else {
      this.checkList = this.checkList.filter(check => check._id !== item._id)
    }
  }

  cancleCheck(item) {
    item.checked = false;
    this.checkList = this.checkList.filter(check => check._id !== item._id)
  }

  cancle() {
    this.dialog.close()
  }

  confirm() {
    let result = [];
    this.checkList.map(item => {
      result = result.concat(this.getUser(item))
    });
    result = Array.from(new Set(result))
    console.log(result);
    this.dialog.close(result)
  }

  getUser(dept) {
    if(dept.isBoss || dept.isBoss == false) {
      return [dept]
    }
    let result = [];
    if(dept.members && dept.members.length > 0) {
      result = result.concat(dept.members)
    }
    if (!dept.children || dept.children.length < 0) {
      return result;
    }
    dept.children.map(item => {
      result.concat(this.getUser(item))
    })
    return result;
  }

}
