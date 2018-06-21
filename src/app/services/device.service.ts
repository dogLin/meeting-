import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DeviceService {
  constructor(
    private api: ApiService
  ) {}

  /**
   *
   * @param type host 主机 speakUnit 发言单元
   */
  getDeviceByType(type) {
    return this.api.getAlldevices()
      .map(
        res => {
          res.data.map(item => {
            if (item.status > 0) {
              item.onLine = true
            } else {
              item.onLine = false
            }
          })
          res.data.map(item => {
            if (item.mic && item.mic.length > 0) {
              item.mic.map(m => {
                let c = res.data.find(d => d._id == m._id)
                if (c) {
                  m.onLine = c.onLine
                }
              })
            }
          })
          if(type) {
            res.data = res.data.filter(item => item.model == type)
          }
          return res
        }
      )
  }

  /**
   * 根据Id获取设备
   * @param deviceId
   */
  getDeviceById(deviceId) {
    return this.api.getAlldevices({deviceId})
  }

  /**
   * 指定主席台
   * @param mac
   */
  appointRost(mac) {
    return this.api.appointRostrum({mac});
  }

  /**
   * 发言模式切换
   * @param model 模式 1：1v1 2:1v3
   */
  switchModel(model) {
    model = Number(model)
    return this.api.switchModel({model});

  }

  /**
   * 调音
   * @param operate 调音对象
   * @param volume 音量
   */
  tone(operate, volume) {
    return this.api.tone({operate, volume})
  }

  /**
   * 禁言
   */
  prohibt() {
    return this.api.prohibitAllSpeak();
  }

  /**
   * 取消禁言
   */
  disProhibt() {
    return this.api.permitAllSpeak();
  }

  /**
   * 发言单元控制
   * @param mac
   * @param operate 0 禁言 1 取消禁言
   */
  speakUnitContorl(mac, operate) {
    return this.api.speakUnitContorl({mac, operate})
  }

  /**
   * 设备配置
   * @param dev
   */
  deviceConfig(dev) {
    let option = {
      mac: dev.mac || '',
      name: dev.name || '',
      devno: dev.devno || '',
      ip: dev.ip || '',
      netmask: dev.netmask || '',
      gateway: dev.gateway || '',
      dns: dev.dns || ''
    }
    return this.api.deviceConfig(option);
  }

  /**
   * 移动摄像头
   * @param operate stop未停止
   */
  moveCamera(operate) {
    return this.api.moveCamera({operate})
  }

  setUpCameraLo(num, mac) {
    return this.api.setUpCameraLo({num, mac})
  }

  getCameraLo(num, mac) {
    return this.api.getCameraLo({num, mac})
  }

  delCameraLo(num, mac) {
    return this.api.delCameraLo({num, mac})
  }
}
