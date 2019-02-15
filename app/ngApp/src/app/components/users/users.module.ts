import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

import {UsersComponent} from './users.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule
  ],
  declarations: [
    UsersComponent,
    SearchComponent,
    UserComponent
  ],
})
export class UsersModule {
}
