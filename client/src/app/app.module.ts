import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataService } from '../srv/data.service';
import { AuthService } from '../srv/auth.service'
import { TokenInterceptor } from '../srv/token.interceptor'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserLstComponent } from './user/user.lst.component';
import { UserAddComponent } from './user/user.add.component';
import { MessageLstComponent } from './message/message.lst.component';
import { MsgTableComponent } from './message/msgtable.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page.not.found.component';

import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserLstComponent,
    UserAddComponent,
    LoginComponent,
    MessageLstComponent,
    MsgTableComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    routing
  ],
  providers: [
    DataService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }