import {Component, OnInit} from '@angular/core';
import {ConnectService} from '../../services/connect.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})

export class TokenComponent implements OnInit {

  _token = '';
  _userId = '';

  constructor(
    private _connect: ConnectService,
    private _router: Router,
  ) {
  }

  _getToken(hash: string) {
    let startInd: number = hash.indexOf('access_token=') + 13;
    const endInd: number = hash.indexOf('&', startInd);
    for (let i = startInd; i < endInd; i++) {
      this._token += hash[i];
    }
    startInd = hash.indexOf('user_id=') + 8;
    for (let i = startInd; i < hash.length; i++) {
      this._userId += hash[i];
    }
  }

  ngOnInit() {
    this._getToken(location.hash);
    this._connect.saveData(this._token, this._userId);
    setTimeout(() => {
      this._router.navigate(['/app/users']);
    }, 5);
  }

}
