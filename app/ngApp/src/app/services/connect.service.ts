import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ConnectService {

  domain = 'http://localhost:8181/';
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getFriends(page: number) {
    return this.http.get(this.domain + 'app/getfriends' + this.token + '&' + page);
  }

  GetToken() {
    return this.http.get(this.domain + 'auth/vk');
  }

  SendCount(count: number) {
    const obj = {count: count};
    return this.http.put(this.domain + 'app/friendsCount', obj);
  }

  getUser(id: number) {
    return this.http.get(this.domain + 'app/getUser' + this.token + '&' + id);
  }

  SendMessage(message: string) {
    const sendMessage = {message: message};
    return this.http.put(this.domain + 'app/sendMessage', sendMessage);
  }

}
