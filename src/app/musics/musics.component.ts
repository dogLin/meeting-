import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';

const musicList = [
  {
    name: '我在诛仙逍遥涧-(游戏《诛仙》主题曲)',
    time: '04:15',
    bit: '5,000,00',
    singer: '王俊凯',
    size: '4.2M',
    date: '2018-03-25  12：25'
  },
  {
    name: '我在诛仙逍遥涧-(游戏《诛仙》主题曲)',
    time: '04":"15',
    bit: '5,000,00',
    singer: '王俊凯',
    size: '4.2M',
    date: '2018-03-25  12：25'
  },
  {
    name: '我在诛仙逍遥涧-(游戏《诛仙》主题曲)',
    time: '04:15',
    bit: '5,000,00',
    singer: '王俊凯',
    size: '4.2M',
    date: '2018-03-25  12：25'
  },
  {
    name: '算什么男人',
    time: '04:15',
    bit: '5,000,00',
    singer: '周杰伦',
    size: '4.2M',
    date: '2018-03-25  12：25'
  },
]

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss'],
  host: {
    '[class.right_content]': "true"
  }
})
export class MusicsComponent implements OnInit {
  displayedColumns = ["name", 'singer', "bit", 'time', 'size', 'date','oper']
  
  currentMusic
  volume = 50
  musicList = musicList
  dataSource: MatTableDataSource<any>
  constructor() { }

  ngOnInit() {
    this.currentMusic = this.musicList[0]
    console.log(this.musicList)
    this.dataSource = new MatTableDataSource(this.musicList)
    
  }

  filter(value) {
    this.dataSource.filter = value.trim();
  }

}
