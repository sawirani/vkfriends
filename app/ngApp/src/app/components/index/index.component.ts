import {Component} from '@angular/core';
import {ConnectService} from '../../services/connect.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  constructor(private con: ConnectService) {
  }

  serverAuth() {
    this.con.getToken().subscribe(result => {
      console.log(result);
    });
  }

  clientAuth() {
    location.href = 'https://oauth.vk.com/authorize?client_id=6850358&display=page&redirect_uri=localhost:4200/app/token&scope=friends,messages&response_type=token&v=5.52';
  }

}
