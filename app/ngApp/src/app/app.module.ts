import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './components/users/users.component';
import { IndexComponent } from './components/index/index.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavigationComponent } from './components/navigation/navigation.component';
import {TestService} from './services/test.service';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    IndexComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
