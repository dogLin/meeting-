import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {
  environment
} from '../../environments/environment';

export class SocketService {
  private url = environment.socket_url;
  private socket;

  sendMessage(message){
    this.socket.emit('add-message', message);
  }
//https://www.cnblogs.com/lxxhome/p/5980615.html
  /**
   * 监听socket推送 vote:投票推送 sign: 签到推送 quite: 禁言推送 speak: 发言推送 devices: 设备状态变化推送
   * @param msg
   */
  getSocket(msg) {
    let observable = new Observable(observer => {
      //建立一个socket连接
      this.socket = io(this.url);
      //监听服务消息
      /*
       创建自定义事件 'message'
       作用：接受服务端 socket.emit('message', 数据); 发出的数据
       */
      this.socket.on(msg, (data) => {
        console.log('socket ->', msg ,data)
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

}
