import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {ConnectService} from '../../services/connect.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  id: any;
  text: string;

  constructor(public dialogRef: MatDialogRef<MessageComponent>,
              private connectService: ConnectService) {
  }

  send() {
    console.log(this.text);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  _getId(path: string) {
    let id = '';
    const ind = path.lastIndexOf('/');
    for (let i = ind + 1; i < path.length; i++) {
      id += path[i];
    }
    return Number(id);
  }

  getMessages() {
    this.connectService.getMasseges(this.id).subscribe((data: any) => {
      if (data.status === 'Ok') {
        console.log(data);
      }
    });
  }

  ngOnInit() {
    this.id = this._getId(location.pathname);
    this.getMessages();
  }

}
