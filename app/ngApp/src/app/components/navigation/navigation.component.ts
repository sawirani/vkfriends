import {Component} from '@angular/core';
import {ConnectService} from '../../services/connect.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(public connectService: ConnectService,
              private _router: Router) {
  }

  deleteData() {
    this.connectService.deleteData();
    setTimeout(() => {
      this._router.navigate(['/app']);
    }, 1000);

  }

}
