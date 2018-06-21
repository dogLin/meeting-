import { NavService } from './nav/nav.service';
import { AuthGuard } from './../auth/auth-guard.service';
import { NavComponent } from './nav/nav.component';
import { AuthModule } from './../auth/auth.module';
import { ManageComponent } from './manage.component';
import { ShareModule } from './../share/share.model';
import { NgModule } from '@angular/core';
import { ManageRoutingModule } from './manage-routing';
import { AuthComponent } from '../auth/auth.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    ShareModule,
    ManageRoutingModule,
    AuthModule
  ],
  declarations: [
    ManageComponent,
    HeaderComponent,
    NavComponent
  ],
  providers: [
    AuthGuard,
  ]
})
export class ManageModule { }
