import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ConnectService {

  domain = 'http://localhost:8181/';

  constructor(private http: HttpClient) {
  }

  getUser() {
    const req = this.domain + 'app/getfriends';
    return this.http.get(req);
  }
}
