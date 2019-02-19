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
  friendsCount: number;

  constructor(
    private _connectService: ConnectService,
    private _router: Router,
  ) {
  }

  toProfile(userId: number) {
    this._router.navigate(['app/profile', userId]);
  }

  _checkParams(params: string, user: User) {
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

  find(user: User) {
    if (this.searchStr) {
      if (this.paramSelect) {
        return !this._checkParams(this.paramSelect, user);
      } else {
        for (const field in user) {
          if (field === 'firstName' || field === 'lastName' || field === 'city') {
            if (this._checkParams(field, user)) {
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

  _getFriends() {
    this._connectService.getFriends()
      .subscribe((data: any) => {
        this.friendsCount = data.data.count;
        this.users = data.data.items.map((item) => {
          const user = new User();
          user.firstName = item.first_name;
          if (user.city) {
            user.city = item.city.title;
          }
          user.lastName = item.last_name;
          user.photo = item.photo_100;
          user.id = item.id;
          return user;
        });
      });
  }

  pageCount(pagecount: number) {
    this._connectService.SendCount(pagecount).subscribe((res) => {
      console.log(res);
      this._getFriends();
    });
  }

  ngOnInit() {
    this._connectService.SendCount(10).subscribe((res) => {
      console.log(res);
      this._getFriends();
    });
  }

}
