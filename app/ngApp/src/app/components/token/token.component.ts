import {Component, OnInit} from '@angular/core';
import {ConnectService} from '../../services/connect.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})

export class TokenComponent implements OnInit {

  token = '';
  userId = '';

  constructor(
    private _connect: ConnectService,
    private router: Router,
  ) {
  }

  _getToken(hash: string) {
    let startInd: number = hash.indexOf('access_token=') + 13;
    const endInd: number = hash.indexOf('&', startInd);
    for (let i = startInd; i < endInd; i++) {
      this.token += hash[i];
    }
    startInd = hash.indexOf('user_id=') + 8;
    for (let i = startInd; i < hash.length; i++) {
      this.userId += hash[i];
    }
  }

  ngOnInit() {
    this._getToken(location.hash);
    this._connect.saveData(this.token, this.userId);
    setTimeout(() => {
      this.router.navigate(['/app/users']);
    }, 5);
  }

}
