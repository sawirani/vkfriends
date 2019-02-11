import {Component, OnInit} from '@angular/core';
import {ConnectService} from '../../services/connect.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: object[];

  constructor(private connectServ: ConnectService) {
  }

  ngOnInit() {
    this.connectServ.getUser()
      .subscribe((data: any) => {
        console.log(data);
        this.users = data.data.items;
        console.log(this.users);
      });
  }

}
