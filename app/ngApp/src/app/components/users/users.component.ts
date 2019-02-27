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
  friendsOnPageOptions = [10, 20, 30, 50];
  friendsOnPage = 10;

  searchField: FormControl;
  sort = false;
  load = false;
  filter = false;

  paramSelect;

  constructor(private _connectService: ConnectService,
              private _router: Router,) {
  }

  _filterServ() {
    this._connectService.filterFriends(this.page, this.paramSelect).subscribe((data: any) => {
      this.usersInit(data.data);
    });
  }

  _sortServ() {
    this._connectService.searchUsers(this.searchStr, this.page).subscribe((res: any) => {
      this.usersInit(res.data);
    });
  }

  _filterSort() {
    this._connectService.filterAndSort(this.paramSelect, this.searchStr, this.page).subscribe((res: any) => {
      this.usersInit(res.data);
    })
  }


  filterFriends() {
    if (this.paramSelect) {
      this.filter = true;
      this.load = true;
      if (this.sort) {
        this._filterSort();
      } else {
        this._filterServ();
      }
      this.load = false;
    } else {
      this.filter = false;
    }
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
        console.log(data);
        if (data.error) {
          this._connectService.deleteData();
          this._router.navigate(['/app']);
        }
        this.usersInit(data.data);
        this.load = false;
      });
  }

  paginatorEvent(pageEvent: PageEvent) {
    if ((pageEvent.pageSize !== this.friendsOnPage)) {
      this.friendsOnPage = pageEvent.pageSize;
      this._connectService.sendCount(this.friendsOnPage).subscribe(() => {
        this._updatePage();
      });
    }
    if ((pageEvent.pageIndex !== this.page)) {
      this.page = pageEvent.pageIndex;
      this._updatePage();
    }
  }

  _updatePage(): void {
    if (this.sort) {

      if (this.filter) {
        this._filterSort()
      } else {
        this._sortServ();
      }

    } else if (this.filter) {
      this.filterFriends();
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
        if (this.filter) {
          this._filterSort();
        }
        this._sortServ();
        this.load = false;
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
