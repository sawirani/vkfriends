import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UsersComponent} from './components/users/users.component';
import {IndexComponent} from './components/index/index.component';

const defaultRoot = 'app';

const routes: Routes = [
  {path: defaultRoot + '', component: IndexComponent, pathMatch: 'full'},
  {path: defaultRoot + '/users', component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
