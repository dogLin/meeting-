import { MeetDetailComponent } from './meet-detail/meet-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { ShareModule } from '../share/share.model';

@NgModule({
  imports: [
    CommonModule,
    ListRoutingModule,
    ShareModule
  ],
  declarations: [
    ListComponent,
    MeetDetailComponent,
  ],
  entryComponents: [
  ]
})
export class ListModule { }
