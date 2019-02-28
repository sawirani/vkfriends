import {Component} from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  constructor() {
  }

  clientAuth() {
    location.href = 'https://oauth.vk.com/authorize?client_id=6850358&display=page&redirect_uri=localhost:4200/app/token&scope=friends&response_type=token&v=5.52';
  }

}
