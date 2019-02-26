import {Component, OnInit} from '@angular/core';
import {ConnectService} from '../../services/connect.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public connectService: ConnectService,
              private router: Router) {
  }

  deleteToken() {
    this.connectService.deleteToken();
    setTimeout(() => {
      this.router.navigate(['/app']);
    }, 1000);

  }

  ngOnInit() {
  }

}
