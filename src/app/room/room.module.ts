import { ShareModule } from './../share/share.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { RoomManaComponent } from './room-mana/room-mana.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    RoomRoutingModule,
    ShareModule,
  ],
  declarations: [RoomComponent, RoomManaComponent, EditComponent]
})
export class RoomModule { }
