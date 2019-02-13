import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import { ConnectService } from '../../services/connect.service';


@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.css']
})
export class DialogViewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogViewComponent>,
    public router: Router,
    public connectService: ConnectService,
  ) {}

  isToken() {
    console.log("tut", this.connectService.isToken());
    return this.connectService.isToken();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  next() {
    this.dialogRef.close();
    this.router.navigate(['/app/users']);
  }

  ngOnInit() {
  }

}
