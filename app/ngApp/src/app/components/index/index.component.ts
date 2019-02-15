import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogViewComponent} from '../dialog-view/dialog-view.component';
import { ConnectService } from '../../services/connect.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  constructor(public dialog: MatDialog,
   private con: ConnectService) {}

  openPopUp(): void {
    const dialogRef = this.dialog.open(DialogViewComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  tok() {
    this.con.GetToken().subscribe(result => {
      console.log(result);
    });
  }

}
