import {Component, OnInit} from '@angular/core';
import {TestService} from '../../services/test.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  name: any;

  constructor(
    private testServ: TestService
  ) {
  }

  getTest() {
    this.testServ.getTestReq()
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  ngOnInit() {
  }

}
