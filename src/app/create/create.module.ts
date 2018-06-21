import { ShareModule } from './../share/share.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { SortablejsModule } from 'angular-sortablejs/dist';

@NgModule({
  imports: [
    CommonModule,
    CreateRoutingModule,
    ShareModule,
    SortablejsModule
  ],
  declarations: [CreateComponent]
})
export class CreateModule { }
