import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataSource } from '../../lib/data-source/data-source';
export class PagerComponent {
    constructor() {
        this.perPageSelect = [];
        this.changePage = new EventEmitter();
        this.count = 0;
    }
    ngOnChanges(changes) {
        if (changes.source) {
            if (!changes.source.firstChange) {
                this.dataChangedSub.unsubscribe();
            }
            this.dataChangedSub = this.source.onChanged().subscribe((dataChanges) => {
                this.page = this.source.getPaging().page;
                this.perPage = this.source.getPaging().perPage;
                this.currentPerPage = this.perPage;
                this.count = this.source.count();
                if (this.isPageOutOfBounce()) {
                    this.source.setPage(--this.page);
                }
                this.processPageChange(dataChanges);
                this.initPages();
            });
        }
    }
    /**
     * We change the page here depending on the action performed against data source
     * if a new element was added to the end of the table - then change the page to the last
     * if a new element was added to the beginning of the table - then to the first page
     * @param changes
     */
    processPageChange(changes) {
        if (changes['action'] === 'prepend') {
            this.source.setPage(1);
        }
        if (changes['action'] === 'append') {
            this.source.setPage(this.getLast());
        }
    }
    shouldShow() {
        return this.source.count() > this.perPage;
    }
    paginate(page) {
        this.source.setPage(page);
        this.page = page;
        this.changePage.emit({ page });
        return false;
    }
    next() {
        return this.paginate(this.getPage() + 1);
    }
    prev() {
        return this.paginate(this.getPage() - 1);
    }
    getPage() {
        return this.page;
    }
    getPages() {
        return this.pages;
    }
    getLast() {
        return Math.ceil(this.count / this.perPage);
    }
    isPageOutOfBounce() {
        return (this.page * this.perPage) >= (this.count + this.perPage) && this.page > 1;
    }
    initPages() {
        const pagesCount = this.getLast();
        let showPagesCount = 4;
        showPagesCount = pagesCount < showPagesCount ? pagesCount : showPagesCount;
        this.pages = [];
        if (this.shouldShow()) {
            let middleOne = Math.ceil(showPagesCount / 2);
            middleOne = this.page >= middleOne ? this.page : middleOne;
            let lastOne = middleOne + Math.floor(showPagesCount / 2);
            lastOne = lastOne >= pagesCount ? pagesCount : lastOne;
            const firstOne = lastOne - showPagesCount + 1;
            for (let i = firstOne; i <= lastOne; i++) {
                this.pages.push(i);
            }
        }
    }
    onChangePerPage(event) {
        if (this.currentPerPage) {
            if (typeof this.currentPerPage === 'string' && this.currentPerPage.toLowerCase() === 'all') {
                this.source.getPaging().perPage = null;
            }
            else {
                this.source.getPaging().perPage = this.currentPerPage * 1;
                this.source.refresh();
            }
            this.initPages();
        }
    }
}
PagerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng2-smart-table-pager',
                template: `
    <nav *ngIf="shouldShow()" class="ng2-smart-pagination-nav">
      <ul class="ng2-smart-pagination pagination">
        <li class="ng2-smart-page-item page-item" [ngClass]="{disabled: getPage() == 1}">
          <a class="ng2-smart-page-link page-link" href="#"
          (click)="getPage() == 1 ? false : paginate(1)" aria-label="First">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">First</span>
          </a>
        </li>
        <li class="ng2-smart-page-item page-item" [ngClass]="{disabled: getPage() == 1}">
          <a class="ng2-smart-page-link page-link page-link-prev" href="#"
             (click)="getPage() == 1 ? false : prev()" aria-label="Prev">
            <span aria-hidden="true">&lt;</span>
            <span class="sr-only">Prev</span>
          </a>
        </li>
        <li class="ng2-smart-page-item page-item"
        [ngClass]="{active: getPage() == page}" *ngFor="let page of getPages()">
          <span class="ng2-smart-page-link page-link"
          *ngIf="getPage() == page">{{ page }} <span class="sr-only">(current)</span></span>
          <a class="ng2-smart-page-link page-link" href="#"
          (click)="paginate(page)" *ngIf="getPage() != page">{{ page }}</a>
        </li>

        <li class="ng2-smart-page-item page-item"
            [ngClass]="{disabled: getPage() == getLast()}">
          <a class="ng2-smart-page-link page-link page-link-next" href="#"
             (click)="getPage() == getLast() ? false : next()" aria-label="Next">
            <span aria-hidden="true">&gt;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
        
        <li class="ng2-smart-page-item page-item"
        [ngClass]="{disabled: getPage() == getLast()}">
          <a class="ng2-smart-page-link page-link" href="#"
          (click)="getPage() == getLast() ? false : paginate(getLast())" aria-label="Last">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Last</span>
          </a>
        </li>
      </ul>
    </nav>
    
    <nav *ngIf="perPageSelect && perPageSelect.length > 0" class="ng2-smart-pagination-per-page">
      <label for="per-page">
        Per Page:
      </label>
      <select (change)="onChangePerPage($event)" [(ngModel)]="currentPerPage" id="per-page">
        <option *ngFor="let item of perPageSelect" [value]="item">{{ item }}</option>
      </select>
    </nav>
  `,
                styles: [".ng2-smart-pagination{display:inline-flex;font-size:.875em;padding:0}.ng2-smart-pagination .sr-only{border:0;clip:rect(0,0,0,0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.ng2-smart-pagination .ng2-smart-page-item{display:inline}.ng2-smart-pagination .page-link-next,.ng2-smart-pagination .page-link-prev{font-size:10px}:host{display:flex;justify-content:space-between}:host label,:host select{margin:1rem 0 1rem 1rem}:host label{line-height:2.5rem}"]
            },] }
];
PagerComponent.propDecorators = {
    source: [{ type: Input }],
    perPageSelect: [{ type: Input }],
    changePage: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2FsdmFyby93b3Jrc3BhY2UvbmcyLXNtYXJ0LXRhYmxlL3Byb2plY3RzL25nMi1zbWFydC10YWJsZS9zcmMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wYWdlci9wYWdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFHakcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBNEQvRCxNQUFNLE9BQU8sY0FBYztJQTFEM0I7UUE2RFcsa0JBQWEsR0FBVSxFQUFFLENBQUM7UUFFekIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFNckMsVUFBSyxHQUFXLENBQUMsQ0FBQztJQThHOUIsQ0FBQztJQXpHQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNuQztZQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDdEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDL0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFH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RXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vbGliL2RhdGEtc291cmNlL2RhdGEtc291cmNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmcyLXNtYXJ0LXRhYmxlLXBhZ2VyJyxcbiAgc3R5bGVVcmxzOiBbJy4vcGFnZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmF2ICpuZ0lmPVwic2hvdWxkU2hvdygpXCIgY2xhc3M9XCJuZzItc21hcnQtcGFnaW5hdGlvbi1uYXZcIj5cbiAgICAgIDx1bCBjbGFzcz1cIm5nMi1zbWFydC1wYWdpbmF0aW9uIHBhZ2luYXRpb25cIj5cbiAgICAgICAgPGxpIGNsYXNzPVwibmcyLXNtYXJ0LXBhZ2UtaXRlbSBwYWdlLWl0ZW1cIiBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IGdldFBhZ2UoKSA9PSAxfVwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwibmcyLXNtYXJ0LXBhZ2UtbGluayBwYWdlLWxpbmtcIiBocmVmPVwiI1wiXG4gICAgICAgICAgKGNsaWNrKT1cImdldFBhZ2UoKSA9PSAxID8gZmFsc2UgOiBwYWdpbmF0ZSgxKVwiIGFyaWEtbGFiZWw9XCJGaXJzdFwiPlxuICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JmxhcXVvOzwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiPkZpcnN0PC9zcGFuPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgICAgPGxpIGNsYXNzPVwibmcyLXNtYXJ0LXBhZ2UtaXRlbSBwYWdlLWl0ZW1cIiBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IGdldFBhZ2UoKSA9PSAxfVwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwibmcyLXNtYXJ0LXBhZ2UtbGluayBwYWdlLWxpbmsgcGFnZS1saW5rLXByZXZcIiBocmVmPVwiI1wiXG4gICAgICAgICAgICAgKGNsaWNrKT1cImdldFBhZ2UoKSA9PSAxID8gZmFsc2UgOiBwcmV2KClcIiBhcmlhLWxhYmVsPVwiUHJldlwiPlxuICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+Jmx0Ozwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiPlByZXY8L3NwYW4+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgICA8bGkgY2xhc3M9XCJuZzItc21hcnQtcGFnZS1pdGVtIHBhZ2UtaXRlbVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInthY3RpdmU6IGdldFBhZ2UoKSA9PSBwYWdlfVwiICpuZ0Zvcj1cImxldCBwYWdlIG9mIGdldFBhZ2VzKClcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5nMi1zbWFydC1wYWdlLWxpbmsgcGFnZS1saW5rXCJcbiAgICAgICAgICAqbmdJZj1cImdldFBhZ2UoKSA9PSBwYWdlXCI+e3sgcGFnZSB9fSA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIj4oY3VycmVudCk8L3NwYW4+PC9zcGFuPlxuICAgICAgICAgIDxhIGNsYXNzPVwibmcyLXNtYXJ0LXBhZ2UtbGluayBwYWdlLWxpbmtcIiBocmVmPVwiI1wiXG4gICAgICAgICAgKGNsaWNrKT1cInBhZ2luYXRlKHBhZ2UpXCIgKm5nSWY9XCJnZXRQYWdlKCkgIT0gcGFnZVwiPnt7IHBhZ2UgfX08L2E+XG4gICAgICAgIDwvbGk+XG5cbiAgICAgICAgPGxpIGNsYXNzPVwibmcyLXNtYXJ0LXBhZ2UtaXRlbSBwYWdlLWl0ZW1cIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiBnZXRQYWdlKCkgPT0gZ2V0TGFzdCgpfVwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwibmcyLXNtYXJ0LXBhZ2UtbGluayBwYWdlLWxpbmsgcGFnZS1saW5rLW5leHRcIiBocmVmPVwiI1wiXG4gICAgICAgICAgICAgKGNsaWNrKT1cImdldFBhZ2UoKSA9PSBnZXRMYXN0KCkgPyBmYWxzZSA6IG5leHQoKVwiIGFyaWEtbGFiZWw9XCJOZXh0XCI+XG4gICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mZ3Q7PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+TmV4dDwvc3Bhbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG4gICAgICAgIFxuICAgICAgICA8bGkgY2xhc3M9XCJuZzItc21hcnQtcGFnZS1pdGVtIHBhZ2UtaXRlbVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogZ2V0UGFnZSgpID09IGdldExhc3QoKX1cIj5cbiAgICAgICAgICA8YSBjbGFzcz1cIm5nMi1zbWFydC1wYWdlLWxpbmsgcGFnZS1saW5rXCIgaHJlZj1cIiNcIlxuICAgICAgICAgIChjbGljayk9XCJnZXRQYWdlKCkgPT0gZ2V0TGFzdCgpID8gZmFsc2UgOiBwYWdpbmF0ZShnZXRMYXN0KCkpXCIgYXJpYS1sYWJlbD1cIkxhc3RcIj5cbiAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZyYXF1bzs8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIj5MYXN0PC9zcGFuPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9uYXY+XG4gICAgXG4gICAgPG5hdiAqbmdJZj1cInBlclBhZ2VTZWxlY3QgJiYgcGVyUGFnZVNlbGVjdC5sZW5ndGggPiAwXCIgY2xhc3M9XCJuZzItc21hcnQtcGFnaW5hdGlvbi1wZXItcGFnZVwiPlxuICAgICAgPGxhYmVsIGZvcj1cInBlci1wYWdlXCI+XG4gICAgICAgIFBlciBQYWdlOlxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxzZWxlY3QgKGNoYW5nZSk9XCJvbkNoYW5nZVBlclBhZ2UoJGV2ZW50KVwiIFsobmdNb2RlbCldPVwiY3VycmVudFBlclBhZ2VcIiBpZD1cInBlci1wYWdlXCI+XG4gICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IGl0ZW0gb2YgcGVyUGFnZVNlbGVjdFwiIFt2YWx1ZV09XCJpdGVtXCI+e3sgaXRlbSB9fTwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgPC9uYXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBzb3VyY2U6IERhdGFTb3VyY2U7XG4gIEBJbnB1dCgpIHBlclBhZ2VTZWxlY3Q6IGFueVtdID0gW107XG5cbiAgQE91dHB1dCgpIGNoYW5nZVBhZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjdXJyZW50UGVyUGFnZTogYW55O1xuXG4gIHByb3RlY3RlZCBwYWdlczogQXJyYXk8YW55PjtcbiAgcHJvdGVjdGVkIHBhZ2U6IG51bWJlcjtcbiAgcHJvdGVjdGVkIGNvdW50OiBudW1iZXIgPSAwO1xuICBwcm90ZWN0ZWQgcGVyUGFnZTogbnVtYmVyO1xuXG4gIHByb3RlY3RlZCBkYXRhQ2hhbmdlZFN1YjogU3Vic2NyaXB0aW9uO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5zb3VyY2UpIHtcbiAgICAgIGlmICghY2hhbmdlcy5zb3VyY2UuZmlyc3RDaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5kYXRhQ2hhbmdlZFN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5kYXRhQ2hhbmdlZFN1YiA9IHRoaXMuc291cmNlLm9uQ2hhbmdlZCgpLnN1YnNjcmliZSgoZGF0YUNoYW5nZXMpID0+IHtcbiAgICAgICAgdGhpcy5wYWdlID0gdGhpcy5zb3VyY2UuZ2V0UGFnaW5nKCkucGFnZTtcbiAgICAgICAgdGhpcy5wZXJQYWdlID0gdGhpcy5zb3VyY2UuZ2V0UGFnaW5nKCkucGVyUGFnZTtcbiAgICAgICAgdGhpcy5jdXJyZW50UGVyUGFnZSA9IHRoaXMucGVyUGFnZTtcbiAgICAgICAgdGhpcy5jb3VudCA9IHRoaXMuc291cmNlLmNvdW50KCk7XG4gICAgICAgIGlmICh0aGlzLmlzUGFnZU91dE9mQm91bmNlKCkpIHtcbiAgICAgICAgICB0aGlzLnNvdXJjZS5zZXRQYWdlKC0tdGhpcy5wYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJvY2Vzc1BhZ2VDaGFuZ2UoZGF0YUNoYW5nZXMpO1xuICAgICAgICB0aGlzLmluaXRQYWdlcygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdlIGNoYW5nZSB0aGUgcGFnZSBoZXJlIGRlcGVuZGluZyBvbiB0aGUgYWN0aW9uIHBlcmZvcm1lZCBhZ2FpbnN0IGRhdGEgc291cmNlXG4gICAqIGlmIGEgbmV3IGVsZW1lbnQgd2FzIGFkZGVkIHRvIHRoZSBlbmQgb2YgdGhlIHRhYmxlIC0gdGhlbiBjaGFuZ2UgdGhlIHBhZ2UgdG8gdGhlIGxhc3RcbiAgICogaWYgYSBuZXcgZWxlbWVudCB3YXMgYWRkZWQgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgdGFibGUgLSB0aGVuIHRvIHRoZSBmaXJzdCBwYWdlXG4gICAqIEBwYXJhbSBjaGFuZ2VzXG4gICAqL1xuICBwcm9jZXNzUGFnZUNoYW5nZShjaGFuZ2VzOiBhbnkpIHtcbiAgICBpZiAoY2hhbmdlc1snYWN0aW9uJ10gPT09ICdwcmVwZW5kJykge1xuICAgICAgdGhpcy5zb3VyY2Uuc2V0UGFnZSgxKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2FjdGlvbiddID09PSAnYXBwZW5kJykge1xuICAgICAgdGhpcy5zb3VyY2Uuc2V0UGFnZSh0aGlzLmdldExhc3QoKSk7XG4gICAgfVxuICB9XG5cbiAgc2hvdWxkU2hvdygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2UuY291bnQoKSA+IHRoaXMucGVyUGFnZTtcbiAgfVxuXG4gIHBhZ2luYXRlKHBhZ2U6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHRoaXMuc291cmNlLnNldFBhZ2UocGFnZSk7XG4gICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB0aGlzLmNoYW5nZVBhZ2UuZW1pdCh7IHBhZ2UgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbmV4dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYWdpbmF0ZSh0aGlzLmdldFBhZ2UoKSArIDEpO1xuICB9XG5cbiAgcHJldigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYWdpbmF0ZSh0aGlzLmdldFBhZ2UoKSAtIDEpO1xuICB9XG5cbiAgZ2V0UGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2U7XG4gIH1cblxuICBnZXRQYWdlcygpOiBBcnJheTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5wYWdlcztcbiAgfVxuXG4gIGdldExhc3QoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMuY291bnQgLyB0aGlzLnBlclBhZ2UpO1xuICB9XG5cbiAgaXNQYWdlT3V0T2ZCb3VuY2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLnBhZ2UgKiB0aGlzLnBlclBhZ2UpID49ICh0aGlzLmNvdW50ICsgdGhpcy5wZXJQYWdlKSAmJiB0aGlzLnBhZ2UgPiAxO1xuICB9XG5cbiAgaW5pdFBhZ2VzKCkge1xuICAgIGNvbnN0IHBhZ2VzQ291bnQgPSB0aGlzLmdldExhc3QoKTtcbiAgICBsZXQgc2hvd1BhZ2VzQ291bnQgPSA0O1xuICAgIHNob3dQYWdlc0NvdW50ID0gcGFnZXNDb3VudCA8IHNob3dQYWdlc0NvdW50ID8gcGFnZXNDb3VudCA6IHNob3dQYWdlc0NvdW50O1xuICAgIHRoaXMucGFnZXMgPSBbXTtcblxuICAgIGlmICh0aGlzLnNob3VsZFNob3coKSkge1xuXG4gICAgICBsZXQgbWlkZGxlT25lID0gTWF0aC5jZWlsKHNob3dQYWdlc0NvdW50IC8gMik7XG4gICAgICBtaWRkbGVPbmUgPSB0aGlzLnBhZ2UgPj0gbWlkZGxlT25lID8gdGhpcy5wYWdlIDogbWlkZGxlT25lO1xuXG4gICAgICBsZXQgbGFzdE9uZSA9IG1pZGRsZU9uZSArIE1hdGguZmxvb3Ioc2hvd1BhZ2VzQ291bnQgLyAyKTtcbiAgICAgIGxhc3RPbmUgPSBsYXN0T25lID49IHBhZ2VzQ291bnQgPyBwYWdlc0NvdW50IDogbGFzdE9uZTtcblxuICAgICAgY29uc3QgZmlyc3RPbmUgPSBsYXN0T25lIC0gc2hvd1BhZ2VzQ291bnQgKyAxO1xuXG4gICAgICBmb3IgKGxldCBpID0gZmlyc3RPbmU7IGkgPD0gbGFzdE9uZTsgaSsrKSB7XG4gICAgICAgIHRoaXMucGFnZXMucHVzaChpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkNoYW5nZVBlclBhZ2UoZXZlbnQ6IGFueSkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRQZXJQYWdlKSB7XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50UGVyUGFnZSA9PT0gJ3N0cmluZycgJiYgdGhpcy5jdXJyZW50UGVyUGFnZS50b0xvd2VyQ2FzZSgpID09PSAnYWxsJykge1xuICAgICAgICB0aGlzLnNvdXJjZS5nZXRQYWdpbmcoKS5wZXJQYWdlID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc291cmNlLmdldFBhZ2luZygpLnBlclBhZ2UgPSB0aGlzLmN1cnJlbnRQZXJQYWdlICogMTtcbiAgICAgICAgdGhpcy5zb3VyY2UucmVmcmVzaCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5pbml0UGFnZXMoKTtcbiAgICB9XG4gIH1cblxufVxuIl19