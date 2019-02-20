import {Component, OnInit} from '@angular/core';
import {ConnectService} from '../../services/connect.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isToken: boolean;

  constructor(
    private _connectService: ConnectService,
    ) {
  }

  ngOnInit() {
    this.isToken = this._connectService.isToken();
  }

}
