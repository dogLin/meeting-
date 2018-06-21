import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class UtilService {
  constructor(
    private toastr: ToastrService,
    private _sanitizer: DomSanitizer
  ) { }

  /**
   * 格式化查询条件
   * @param query 查询对象
   */
  queryStrinfy(query) {
    if (!query) {
      return '';
    }
    let qs = []
    for (let key in query) {
      qs.push(`${key}=${query[key]}`)
    }
    return '?' + qs.join("&");
  }
  /**
   * a = [
    {
      prop: "name",
      label: '用户名',
      max: 10,
      min: 1,
      validations: [
        {
          rule: '某个正则',
          msg: 'xxxx'
        }
      ]
    }
  ]
   * @param obj 校验对象
   * @param validatRule 校验属性与规则
   */
  validation(obj, validatRule) {
    for (let item of validatRule) {
      if (typeof (obj[item.prop]) == 'undefined' || obj[item.prop] == null || obj[item.prop].length == 0) {
        this.toastr.error(`${item.label}不能为空`,'表单错误')
        return false
      }
      if (typeof (item.min) !== 'undefined' && obj[item.min].length < item.min) {
        this.toastr.error(`${item.label}长度应大于${item.min}`,'表单错误')
        return false
      }
      if (typeof (item.max) !== 'undefined' && obj[item.max].length > item.max) {
        this.toastr.error(`${item.label}长度应小于${item.max}`,'表单错误')
        return false
      }
      if (item.validations && item.validations.length > 0) {
        for (let vt of item.validations) {
          if (!vt.rule.test(obj[item.prop])) {
            this.toastr.error(`${item.label}长度应小于${item.max}`,'表单错误')
            return false
          }
        }
      }
    }
    return true
  }

  /**
   * 数字补零
   * @param num
   * @param length
   */
  numToString(num,length = 2) {
    if ((num+'').length >= length) {
      return num;
    }
    let leftLength = length - (num+'').length;
    for (let i = 0; i < leftLength; i++) {
      num = "0"+num;
    }
    return num;

  }

  getAllTimesOption(interVal,beginHour = 0,beginMin = 0, endHour=24, ) {
    let result = [];
    if (beginMin % interVal !== 0) {
      beginMin = (Math.floor(beginMin/interVal) +1) * interVal
    }
    for (let j = beginMin; j < 60;) {
      result.push(this.numToString(beginHour) + ':' + this.numToString(j));
      j = j+interVal
    }
    for (let i = beginHour+1; i <= endHour; i++) {
      let item = this.numToString(i) + ':';
      if (i == endHour) {
        result.push(item + "00");
      } else {
        for (let j = 0; j < 60;) {
          result.push(item + this.numToString(j));
          j = j+interVal
        }
      }
    }
    return result;
  }
  

  /***
   * 获取会议室显示颜色
   */
  switchColor(data) {
    if (data.status == "预约") {
      return this._sanitizer.bypassSecurityTrustStyle("#7CD5A7");
    }
    if (data.status == "进行中") {
      return this._sanitizer.bypassSecurityTrustStyle("#FE7156");

    }
    if (data.status == "未进行" || data.status == "已取消") {
      return this._sanitizer.bypassSecurityTrustStyle("#F9C22D");
    }
    if (data.status == "已结束") {
      return this._sanitizer.bypassSecurityTrustStyle("#6BA9FF");
    }
  }
}
