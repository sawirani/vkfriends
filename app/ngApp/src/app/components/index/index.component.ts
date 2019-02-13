import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogViewComponent} from '../dialog-view/dialog-view.component';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  constructor(public dialog: MatDialog) {}

  openPopUp(): void {
    const dialogRef = this.dialog.open(DialogViewComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
