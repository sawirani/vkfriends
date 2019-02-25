import {Component, OnInit} from '@angular/core';
import {ConnectService} from '../../services/connect.service';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {PageEvent} from '@angular/material';

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

  page = 0;
  friendsOnPageOptions = [10, 20, 30];
  friendsOnPage = 10;

  searchField: FormControl;
  sort = false;
  load = false;

  paramSelect;

  constructor(private _connectService: ConnectService,
              private _router: Router) {
  }

  filter() {
    console.log(this.paramSelect);
  }

  filterFriends() {
    console.log('tut');
    this._connectService.filterFriends(0, 'first_name').subscribe((data) => {
      console.log(data);
    });
  }

  toProfile(userId: number) {
    this._router.navigate(['app/profile', userId]);
  }

  usersInit(newUsers: any) {
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

  paginatorEvent(pageEvent: PageEvent) {
    console.log(pageEvent);
    if ((pageEvent.pageSize !== this.friendsOnPage)) {
      this.friendsOnPage = pageEvent.pageSize;
      this._connectService.sendCount(this.friendsOnPage).subscribe(() => {
      });
    }
    if ((pageEvent.pageIndex !== this.page)) {
      this._changePage(pageEvent.pageIndex);
    }
  }

  _changePage(page: number): void {
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
        this.page = 0;
        this.load = true;
        this.friendsOnPage = 10;
        this._connectService.searchUsers(term, this.page).subscribe((res: any) => {
          this.usersInit(res.data);
          this.load = false;
        });
      } else {
        this.sort = false;
        this.page = 0;
        this.load = true;
        this.friendsOnPage = 10;
        this._connectService.sendCount(10).subscribe(() => {
          this._getFriends(this.page);
          this.load = false;
        });
      }
    });
  }

}
