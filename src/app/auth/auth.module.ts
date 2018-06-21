import { NoAuthGuard } from './no-auth-guard.service';
import { AuthService } from './auth.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ShareModule } from '../share/share.model';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  imports: [
    ShareModule,
    AuthRoutingModule,
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    AuthService,
    NoAuthGuard
  ]
})
export class AuthModule {}
