import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import {UsersComponent} from './users.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ],
  declarations: [
    UsersComponent,
    UserComponent
  ],
})
export class UsersModule {
}
