import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import {ConnectService} from './services/connect.service';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noauth.guard';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { IndexComponent } from './components/index/index.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TokenComponent } from './components/token/token.component';
import { UserComponent } from './components/user/user.component';
import { DialogViewComponent } from './components/dialog-view/dialog-view.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    IndexComponent,
    NavigationComponent,
    TokenComponent,
    DialogViewComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [ConnectService, AuthGuard, NoAuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [DialogViewComponent]
})
export class AppModule { }
