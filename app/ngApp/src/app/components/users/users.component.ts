import {Component, OnInit} from '@angular/core';
import {ConnectService} from '../../services/connect.service';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

// count!!! при заборе данных отправлять вторым параметром count


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  searchStr: string;
  friendsCount: number;
  page = 1;
  friendsOnPage = 10;
  searchField: FormControl;
  sort = false;
  load = false;

  constructor(private _connectService: ConnectService,
              private _router: Router) {
  }

  toProfile(userId: number) {
    this._router.navigate(['app/profile', userId]);
  }

  // _checkParams(params: string, user: User) {
  //   let count = 0;
  //   for (let i = 0; i < this.searchStr.length; i++) {
  //     if (user[params][i].toLowerCase() === this.searchStr[i]) {
  //       count++;
  //     }
  //     if (count === this.searchStr.length) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  //
  // find(user: User) {
  //   if (this.searchStr) {
  //     if (this.paramSelect) {
  //       return !this._checkParams(this.paramSelect, user);
  //     } else {
  //       for (const field in user) {
  //         if (field === 'firstName' || field === 'lastName' || field === 'city') {
  //           if (this._checkParams(field, user)) {
  //             return false;
  //           }
  //         }
  //       }
  //       return true;
  //     }
  //   } else {
  //     return false;
  //   }
  // }

  usersInit(newUsers: any) {
    //console.log(newUsers);
    this.users = newUsers.items.map((item) => {
      const user = new User();
      this.friendsCount = newUsers.count;
      user.firstName = item.first_name;
      if (item.city) {
        user.city = item.city.title;
      }
      user.lastName = item.last_name;
      user.photo = item.photo_100;
      user.id = item.id;
      return user;
    });
  }

  _getFriends(page: number) {
    this.load = true;
    this._connectService.getFriends(page)
      .subscribe((data: any) => {
        this.usersInit(data.data);
        this.load = false;
      });
  }

  changeFriendsCount(pageCount: number) {
    this.friendsOnPage = pageCount;
  }

  changePage(page: number) {
    this.page = page;
    if (this.sort) {
      this._connectService.searchUsers(this.searchStr, this.page).subscribe((res: any) => {
        this.usersInit(res.data);
      });
    } else {
      this._getFriends(this.page);
    }
  }

  ngOnInit() {
    this._connectService.sendCount(10).subscribe(() => {
      this._getFriends(this.page);
    });
    this.searchField = new FormControl();
    this.searchField.valueChanges.subscribe(term => {
      this.searchStr = term;
      if (term) {
        this.sort = true;
        this.page = 1;
        this.load = true;
        this._connectService.searchUsers(term, this.page).subscribe((res: any) => {
          this.usersInit(res.data);
          this.load = false;
        });
      } else {
        this.sort = false;
        this.page = 1;
        this.load = true;
        this._connectService.sendCount(10).subscribe(() => {
          this._getFriends(this.page);
          this.load = false;
        });
      }
    });
  }

}
