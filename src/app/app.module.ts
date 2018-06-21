import { SocketService } from './services/socket.service';
import { NavService } from './manage/nav/nav.service';
import { PopService } from './services/pop.service';
import { MeetingService } from './services/meeting.service';
import { UtilService } from './services/util.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.model';
import { ShareModule } from './share/share.model';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { DeviceService } from './services/device.service';
import { SortablejsModule } from 'angular-sortablejs';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ShareModule,
    CoreModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SortablejsModule.forRoot({ animation: 150 }),
  ],
  providers: [
    UtilService,
    MeetingService,
    PopService,
    NavService,
    DeviceService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
