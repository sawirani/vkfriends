import {Component, OnInit} from '@angular/core';
import {ConnectService} from '../../services/connect.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: object[];
  token: string;

  constructor(
    private connectServ: ConnectService,
  ) {}


  ngOnInit() {
    this.connectServ.getUser()
      .subscribe((data: any) => {
        this.users = data.data.items;
      });
  }

}
