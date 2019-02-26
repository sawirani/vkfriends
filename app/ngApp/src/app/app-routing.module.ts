import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noauth.guard';

import {UsersComponent} from './components/users/users.component';
import {IndexComponent} from './components/index/index.component';
import {TokenComponent} from './components/token/token.component';
import {ProfileComponent} from './components/profile/profile.component';
import {NotfoundComponent} from './components/notfound/notfound.component';

const defaultRoot = 'app';

const routes: Routes = [
  {
    path: defaultRoot + '',
    component: IndexComponent,
    canActivate : [NoAuthGuard],
  },
  {
    path: defaultRoot + '/users',
    component: UsersComponent,
    canActivate : [AuthGuard],
  },
  {
    path: defaultRoot + '/token',
    component: TokenComponent,
    canActivate : [NoAuthGuard],
  },
  {
    path: defaultRoot + '/profile',
    component: ProfileComponent,
    canActivate : [AuthGuard],
  },
  {
    path: defaultRoot + '/profile/:id',
    component: ProfileComponent,
    canActivate : [AuthGuard],
  },
  {
    path: '**',
    component: NotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
