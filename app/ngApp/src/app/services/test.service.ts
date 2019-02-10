import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TestService {

  domain = 'http://localhost:8181/'

  constructor(private http: HttpClient) {
  }

  getTestReq() {
    return this.http.get(this.domain + 'app/test');
  }
}
