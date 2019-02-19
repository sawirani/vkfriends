import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

import {ConnectService} from './services/connect.service';

import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './guards/auth.guard';
import {NoAuthGuard} from './guards/noauth.guard';

import {AppComponent} from './app.component';
import {IndexComponent} from './components/index/index.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {TokenComponent} from './components/token/token.component';
import {UsersModule} from './components/users/users.module';
import {ProfileComponent} from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavigationComponent,
    TokenComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    UsersModule,
  ],
  providers: [ConnectService, AuthGuard, NoAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
