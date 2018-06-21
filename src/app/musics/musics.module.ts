import { ShareModule } from './../share/share.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicsRoutingModule } from './musics-routing.module';
import { MusicsComponent } from './musics.component';

@NgModule({
  imports: [
    CommonModule,
    MusicsRoutingModule,
    ShareModule
  ],
  declarations: [MusicsComponent]
})
export class MusicsModule { }
