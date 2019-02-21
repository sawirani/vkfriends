import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConnectService} from '../../services/connect.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() items: number;

  @Output() sendPageCount: EventEmitter<number> = new EventEmitter<number>(); // изменили количество страниц
  @Output() nowPage: EventEmitter<number> = new EventEmitter<number>(); // перешли на новую страницу

  page: number;
  pagesNumber: number[];
  pagesCount = 6;
  maxPages: number;

  prevPages = 10;

  prevCount: number[] = [10, 20, 30];

  constructor() {
  }

  changePages() {
    if (!this.pagesNumber) {
      this.page = 1;
      this.pagesNumber = [];
      for (let i = 1; i <= this.pagesCount; i++) {
        this.pagesNumber.push(i);
      }
    }

    if (this.pagesNumber.length > this.maxPages) {
      this.pagesNumber.length = this.maxPages;
    } else if ((this.pagesNumber.length < this.pagesCount) && (this.pagesCount < this.maxPages)) {
      while (this.pagesNumber.length !== this.pagesCount) {
        this.pagesNumber.push(this.pagesNumber[length - 1] + 1);
      }
    }

    if (this.page >= this.pagesNumber[this.pagesNumber.length - 1]) {
      if (this.pagesNumber[this.pagesNumber.length - 1] === this.maxPages) {
        return;
      }
      this.pagesNumber.shift();
      this.pagesNumber.push(this.pagesNumber[this.pagesNumber.length - 1] + 1);
    } else if (this.page <= this.pagesNumber[this.pagesNumber.length - 1]) {
      if (this.pagesNumber[0] === 1) {
        return;
      }
      this.pagesNumber.pop();
      this.pagesNumber.unshift(this.pagesNumber[0] - 1);
    }
  }

  changePage(newPage: number) {
    this.page = newPage;
    this.nowPage.emit(this.page);
    this._getMaxPages();
    this.changePages();
  }

  nextPage() {
    this._getMaxPages();
    if (this.page < this.maxPages) {
      this.page++;
      this.nowPage.emit(this.page);
      this.changePages();
    }
  }

  lastPage() {
    this._getMaxPages();
    if (this.page > 1) {
      this.page--;
      this.nowPage.emit(this.page);
      this.changePages();
    }
  }

  _getMaxPages() {
    this.maxPages = Math.ceil(this.items / this.prevPages);
  }

  isThisPage(page: number) {
    if (page === this.page)
      return 'checkPage';
  }

  changePageCount() {
    this.sendPageCount.emit(this.prevPages);
    this._getMaxPages();
    this.page = 1;
    this.pagesNumber = undefined;
    this.changePages();
  }

  ngOnInit() {
    this.page = 1;
    this.changePages();
  }

}
