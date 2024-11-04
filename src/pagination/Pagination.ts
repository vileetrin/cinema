import { action, makeObservable, observable } from 'mobx';

export default class Pagination {
  _totalItems: number = 0;
  _currentPage: number = 1;
  _pageSize: number;

  constructor(public pageSize: number) {
    this._pageSize = pageSize;

    makeObservable(this, {
      _totalItems: observable,
      _currentPage: observable,
      _pageSize: observable,
      setTotalItems: action,
      setCurrentPage: action,
    });
  }

  get currentPage(): number {
    return this._currentPage;
  }

  setTotalItems(total: number): void {
    this._totalItems = total;
  }

  setCurrentPage(page: number): void {
    this._currentPage = page;
  }

  isLastPage(): boolean {
    return !(this.currentPage * this._pageSize < this._totalItems);
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }
}
