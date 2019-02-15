import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() users: User[];
  @Output() sortUsers = new EventEmitter<User[]>();

  // @Output() onChanged = new EventEmitter<boolean>();
  // change(increased:any) {
  //   this.onChanged.emit(increased);
  // }

  constructor() {
  }

  ngOnInit() {
  }

}
