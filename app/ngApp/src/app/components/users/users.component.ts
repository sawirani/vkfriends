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
  serchStr: string;


  constructor(
    private _connectService: ConnectService,
    private _router: Router,
  ) {
  }

  toProfile(userId: number) {
    this._router.navigate(['app/profile', userId]);
  }

  // имя фамилия город
  handleChange() {
    let count = 0;

    this.users = this.users.filter(user => {
      const keys = Object.keys(user);
      for (let j = 0; j < keys.length; j++) {
        if (user[keys[j]] === 'firstName' || user[keys[j]] === 'lastName' || user[keys[j]] === 'city') {
          for (let i = 0; i < this.serchStr.length; i++) {
            if (count === this.serchStr.length) {
              return true;
            }
            if (user[keys[j]][i] === this.serchStr[i]) {
              count++;
            }
          }
        }
      }
      return false;
    });
  }

  ngOnInit() {
    this._connectService.getUser()
      .subscribe((data: any) => {
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
