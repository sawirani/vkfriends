import {Component, OnInit} from '@angular/core';
import {ConnectService} from '../../services/connect.service';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  searchStr = '';
  paramSelect: string;


  constructor(
    private _connectService: ConnectService,
    private _router: Router,
  ) {
  }

  toProfile(userId: number) {
    this._router.navigate(['app/profile', userId]);
  }

  _checkPerams(params: string, user: User) {
    let count = 0;
    for (let i = 0; i < this.searchStr.length; i++) {
      if (user[params][i].toLowerCase() === this.searchStr[i]) {
        count++;
      }
      if (count === this.searchStr.length) {
        return true;
      }
    }
    return false;
  }

  // имя фамилия город
  find(user: User) {
    if (this.searchStr) {
      if (this.paramSelect) {
        return !this._checkPerams(this.paramSelect, user);
      } else {
        for (const field in user) {
          if (field === 'firstName' || field === 'lastName' || field === 'city') {
            if (this._checkPerams(field, user)) {
              return false;
            }
          }
        }
        return true;
      }
    } else {
      return false;
    }
  }

  ngOnInit() {
    this._connectService.getFriends()
      .subscribe((data: any) => {
        console.log(data);
        this.users = data.data.items.map((item) => {
          const user = new User();
          user.firstName = item.first_name;
          user.city = item.city.title;
          user.lastName = item.last_name;
          user.online = item.online;
          user.photo = item.photo_100;
          user.id = item.id;
          return user;
        });
      });
  }

}
