import {Component, OnInit} from '@angular/core';
import {ConnectService} from '../../services/connect.service';
import {User} from '../../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Counters} from '../../models/profilecounters.model';
import {About} from '../../models/about.models';
import {MessageComponent} from '../message/message.component';
import {MatDialog} from '@angular/material';
import {Profile} from '../../models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Profile;
  id: number;
  about: About;
  counters: Counters;

  constructor(private connectService: ConnectService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private dialog: MatDialog,) {
  }

  getUser() {
    this.connectService.getUser(this.id)
      .subscribe((data: any) => {
        if (data.status === 'Ok') {
          console.log(data);
          this.user = new Profile();
          this.counters = new Counters();
          this.about = new About();

          this.user.firstName = data.data[0].first_name;
          this.user.lastName = data.data[0].last_name;
          this.user.city = data.data[0].city.title;
          this.user.country = data.data[0].country.title;
          this.user.photo = data.data[0].photo_400_orig;

          this.counters.photos = data.data[0].counters.photos;
          this.counters.videos = data.data[0].counters.videos;
          this.counters.audios = data.data[0].counters.audios;
          this.counters.friends = data.data[0].counters.friends;
          this.counters.mutual_friends = data.data[0].counters.mutual_friends;
          this.counters.online_friends = data.data[0].counters.online_friends;

          this.about.about = data.data[0].about;
          this.about.activities = data.data[0].activities;
          this.about.books = data.data[0].books;
          this.about.interests = data.data[0].interests;
          this.about.movies = data.data[0].movies;
          this.about.music = data.data[0].music;

          if (data.data[0].sex === 2) {
            this.user.sex = 'мужской';
          } else {
            this.user.sex = 'женский';
          }
          this.user.bithday = data.data[0].bdate;
        }
      });
  }

  openMessage() {
    const dialogRef = this.dialog.open(MessageComponent, {
      width: '500px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;
    this.getUser();
  }

}
