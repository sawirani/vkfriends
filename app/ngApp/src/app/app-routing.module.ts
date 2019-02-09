import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { UsersComponent } from './users/users.component';
import { IndexComponent} from "./index/index.component";

let defaultRoot = 'app';

const routes: Routes = [
  {path: defaultRoot + '', component: IndexComponent},
  {path: defaultRoot + '/users', component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
