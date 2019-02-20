import {Component, OnInit} from '@angular/core';
import {ConnectService} from '../../services/connect.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})

// !!!!!!!!!!!!!!!!! private activateRoute: ActivatedRoute
// this.activateRoute.snapshot.params

export class TokenComponent implements OnInit {

  constructor(
    private connect: ConnectService,
    private router: Router,
  ) {
  }

  _getToken(hash: string): string {
    const startInd: number = hash.indexOf('access_token=') + 13;
    const endInd: number = hash.indexOf('&', startInd);
    let token = '';
    for (let i = startInd; i < endInd; i++) {
      token += hash[i];
    }
    return token;
  }

  ngOnInit() {
    console.log(location.hash);
    const token: string = this._getToken(location.hash);
    this.connect.saveToken(token);
    setTimeout(() => {
        this.router.navigate(['/app/users']);
      }
      , 5);
  }

}
