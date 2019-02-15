import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ConnectService {

  domain = 'http://localhost:8181/';

  constructor(private http: HttpClient) {
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isToken(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  getUser() {
    const token = localStorage.getItem('token');
    return this.http.get(this.domain + 'app/getfriends' + token);
  }

  GetToken() {
    console.log("tut");
    return this.http.get(this.domain + 'auth/vk');
  }
  
}
