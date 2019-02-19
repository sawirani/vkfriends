import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';

import {UsersComponent} from './users.component';
import { UserComponent } from './user/user.component';
import {PaginationComponent} from '../pagination/pagination.component';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    UsersComponent,
    UserComponent,
    PaginationComponent,
  ],
})
export class UsersModule {
}
