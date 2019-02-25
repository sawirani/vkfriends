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
    return !!localStorage.getItem('token');
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }

  getToken() {
    return this.http.get(this.domain + 'auth/vk');
  }

  getFriends(page: number) {
    const token = localStorage.getItem('token');
    return this.http.get(this.domain + 'app/getfriends' + token + '&' + page);
  }

  sendCount(count: number) {
    const obj = {count: count};
    return this.http.put(this.domain + 'app/friendsCount', obj);
  }

  getUser(id: number) {
    const token = localStorage.getItem('token');
    return this.http.get(this.domain + 'app/getUser' + token + '&' + id);
  }

  searchUsers(str: string, page: number) {
    const token = localStorage.getItem('token');
    return this.http.get(this.domain + 'app/searchUsers' + token + '&' + str + '&' + page);
  }

  filterFriends(page: number, param: string) {
    const token = localStorage.getItem('token');
    return this.http.get(this.domain + 'app/filter' + token + '&' + param + '&' + page);
  }

  filterAndSort(param: string, str: string, page: number) {
    const token = localStorage.getItem('token');
    return this.http.get(this.domain + 'app/filersort' + token + '&' + str + '&' + page + '&' + param);
  }
}
