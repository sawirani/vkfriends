import {Component, OnInit} from '@angular/core';
import {ConnectService} from '../../services/connect.service';
import {ActivatedRoute} from '@angular/router';
import {Counters} from '../../models/profilecounters.model';
import {About} from '../../models/about.models';
import {Profile} from '../../models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Profile;
  about: About;
  counters: Counters;

  constructor(private _connectService: ConnectService,
              private _activateRoute: ActivatedRoute) {
  }

  _getUser(id: number) {
    this._connectService.getUser(id)
      .subscribe((data: any) => {
        if (data.status === 'Ok') {
          this.user = new Profile();

          this.user.firstName = data.data[0].first_name;
          this.user.lastName = data.data[0].last_name;
          if (data.data[0].city) {
            this.user.city = data.data[0].city.title;
          }
          if (data.data[0].country) {
            this.user.country = data.data[0].country.title;
          }
          this.user.photo = data.data[0].photo_400_orig;

          if (data.data[0].counters) {
            this.counters = new Counters();
            this.counters.photos = data.data[0].counters.photos;
            this.counters.videos = data.data[0].counters.videos;
            this.counters.audios = data.data[0].counters.audios;
            this.counters.friends = data.data[0].counters.friends;
            this.counters.mutual_friends = data.data[0].counters.mutual_friends;
            this.counters.online_friends = data.data[0].counters.online_friends;
          }

          if (data.data[0].about) {
            this.about = new About();
            this.about.about = data.data[0].about;
            this.about.activities = data.data[0].activities;
            this.about.books = data.data[0].books;
            this.about.interests = data.data[0].interests;
            this.about.movies = data.data[0].movies;
            this.about.music = data.data[0].music;
          }

          if (data.data[0].sex === 2) {
            this.user.sex = 'мужской';
          } else {
            this.user.sex = 'женский';
          }
          this.user.bithday = data.data[0].bdate;
        }
      });
  }

  ngOnInit() {
    let id: number;
    if (this._activateRoute.snapshot.params.id) {
      id = this._activateRoute.snapshot.params.id;
    } else {
      id = this._connectService.getUserId();
    }
    this._getUser(id);
  }

}
