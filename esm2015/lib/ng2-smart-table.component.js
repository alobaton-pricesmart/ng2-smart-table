import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Grid } from './lib/grid';
import { DataSource } from './lib/data-source/data-source';
import { deepExtend, getPageForRowIndex } from './lib/helpers';
import { LocalDataSource } from './lib/data-source/local/local.data-source';
export class Ng2SmartTableComponent {
    constructor() {
        this.settings = {};
        this.rowSelect = new EventEmitter();
        this.rowDeselect = new EventEmitter();
        this.userRowSelect = new EventEmitter();
        this.delete = new EventEmitter();
        this.edit = new EventEmitter();
        this.create = new EventEmitter();
        this.custom = new EventEmitter();
        this.deleteConfirm = new EventEmitter();
        this.editConfirm = new EventEmitter();
        this.createConfirm = new EventEmitter();
        this.rowHover = new EventEmitter();
        this.defaultSettings = {
            mode: 'inline',
            selectMode: 'single',
            /**
             * Points to an element in all data
             *
             * when < 0 all lines must be deselected
             */
            selectedRowIndex: 0,
            switchPageToSelectedRowPage: false,
            hideHeader: false,
            hideSubHeader: false,
            actions: {
                columnTitle: 'Actions',
                add: true,
                edit: true,
                delete: true,
                custom: [],
                position: 'left',
            },
            filter: {
                inputClass: '',
            },
            edit: {
                inputClass: '',
                editButtonContent: 'Edit',
                saveButtonContent: 'Update',
                cancelButtonContent: 'Cancel',
                confirmSave: false,
            },
            add: {
                inputClass: '',
                addButtonContent: 'Add New',
                createButtonContent: 'Create',
                cancelButtonContent: 'Cancel',
                confirmCreate: false,
            },
            delete: {
                deleteButtonContent: 'Delete',
                confirmDelete: false,
            },
            attr: {
                id: '',
                class: '',
            },
            noDataMessage: 'No data found',
            columns: {},
            pager: {
                display: true,
                page: 1,
                perPage: 10,
            },
            rowClassFunction: () => '',
        };
        this.isAllSelected = false;
        this.destroyed$ = new Subject();
    }
    ngOnChanges(changes) {
        if (this.grid) {
            if (changes['settings']) {
                this.grid.setSettings(this.prepareSettings());
            }
            if (changes['source']) {
                this.source = this.prepareSource();
                this.grid.setSource(this.source);
            }
        }
        else {
            this.initGrid();
        }
        this.tableId = this.grid.getSetting('attr.id');
        this.tableClass = this.grid.getSetting('attr.class');
        this.isHideHeader = this.grid.getSetting('hideHeader');
        this.isHideSubHeader = this.grid.getSetting('hideSubHeader');
        this.isPagerDisplay = this.grid.getSetting('pager.display');
        this.isPagerDisplay = this.grid.getSetting('pager.display');
        this.perPageSelect = this.grid.getSetting('pager.perPageSelect');
        this.rowClassFunction = this.grid.getSetting('rowClassFunction');
    }
    ngOnDestroy() {
        this.destroyed$.next();
    }
    selectRow(index, switchPageToSelectedRowPage = this.grid.getSetting('switchPageToSelectedRowPage')) {
        if (!this.grid) {
            return;
        }
        this.grid.settings.selectedRowIndex = index;
        if (this.isIndexOutOfRange(index)) {
            // we need to deselect all rows if we got an incorrect index
            this.deselectAllRows();
            return;
        }
        if (switchPageToSelectedRowPage) {
            const source = this.source;
            const paging = source.getPaging();
            const page = getPageForRowIndex(index, paging.perPage);
            index = index % paging.perPage;
            this.grid.settings.selectedRowIndex = index;
            if (page !== paging.page) {
                source.setPage(page);
                return;
            }
        }
        const row = this.grid.getRows()[index];
        if (row) {
            this.onSelectRow(row);
        }
        else {
            // we need to deselect all rows if we got an incorrect index
            this.deselectAllRows();
        }
    }
    deselectAllRows() {
        this.grid.dataSet.deselectAll();
        this.emitDeselectRow(null);
    }
    editRowSelect(row) {
        if (this.grid.getSetting('selectMode') === 'multi') {
            this.onMultipleSelectRow(row);
        }
        else {
            this.onSelectRow(row);
        }
    }
    onUserSelectRow(row) {
        if (this.grid.getSetting('selectMode') !== 'multi') {
            this.grid.selectRow(row);
            this.emitUserSelectRow(row);
            this.emitSelectRow(row);
        }
    }
    onRowHover(row) {
        this.rowHover.emit(row);
    }
    multipleSelectRow(row) {
        this.grid.multipleSelectRow(row);
        this.emitUserSelectRow(row);
        this.emitSelectRow(row);
    }
    onSelectAllRows($event) {
        this.isAllSelected = !this.isAllSelected;
        this.grid.selectAllRows(this.isAllSelected);
        this.emitUserSelectRow(null);
        this.emitSelectRow(null);
    }
    onSelectRow(row) {
        this.grid.selectRow(row);
        this.emitSelectRow(row);
    }
    onMultipleSelectRow(row) {
        this.emitSelectRow(row);
    }
    initGrid() {
        this.source = this.prepareSource();
        this.grid = new Grid(this.source, this.prepareSettings());
        this.subscribeToOnSelectRow();
        this.subscribeToOnDeselectRow();
    }
    prepareSource() {
        if (this.source instanceof DataSource) {
            return this.source;
        }
        else if (this.source instanceof Array) {
            return new LocalDataSource(this.source);
        }
        return new LocalDataSource();
    }
    prepareSettings() {
        return deepExtend({}, this.defaultSettings, this.settings);
    }
    changePage($event) {
        this.resetAllSelector();
    }
    sort($event) {
        this.resetAllSelector();
    }
    filter($event) {
        this.resetAllSelector();
    }
    resetAllSelector() {
        this.isAllSelected = false;
    }
    emitUserSelectRow(row) {
        const selectedRows = this.grid.getSelectedRows();
        this.userRowSelect.emit({
            data: row ? row.getData() : null,
            isSelected: row ? row.getIsSelected() : null,
            source: this.source,
            selected: selectedRows && selectedRows.length ? selectedRows.map((r) => r.getData()) : [],
        });
    }
    emitSelectRow(row) {
        const data = {
            data: row ? row.getData() : null,
            isSelected: row ? row.getIsSelected() : null,
            source: this.source,
        };
        this.rowSelect.emit(data);
        if (!(row === null || row === void 0 ? void 0 : row.isSelected)) {
            this.rowDeselect.emit(data);
        }
    }
    emitDeselectRow(row) {
        this.rowDeselect.emit({
            data: row ? row.getData() : null,
            isSelected: row ? row.getIsSelected() : null,
            source: this.source,
        });
    }
    isIndexOutOfRange(index) {
        var _a;
        const dataAmount = (_a = this.source) === null || _a === void 0 ? void 0 : _a.count();
        return index < 0 || (typeof dataAmount === 'number' && index >= dataAmount);
    }
    subscribeToOnSelectRow() {
        if (this.onSelectRowSubscription) {
            this.onSelectRowSubscription.unsubscribe();
        }
        this.onSelectRowSubscription = this.grid.onSelectRow()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((row) => {
            this.emitSelectRow(row);
        });
    }
    subscribeToOnDeselectRow() {
        if (this.onDeselectRowSubscription) {
            this.onDeselectRowSubscription.unsubscribe();
        }
        this.onDeselectRowSubscription = this.grid.onDeselectRow()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((row) => {
            this.emitDeselectRow(row);
        });
    }
}
Ng2SmartTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng2-smart-table',
                template: "<table [id]=\"tableId\" [ngClass]=\"tableClass\">\n\n  <thead ng2-st-thead *ngIf=\"!isHideHeader || !isHideSubHeader\"\n                      [grid]=\"grid\"\n                      [isAllSelected]=\"isAllSelected\"\n                      [source]=\"source\"\n                      [createConfirm]=\"createConfirm\"\n                      (create)=\"create.emit($event)\"\n                      (selectAllRows)=\"onSelectAllRows($event)\"\n                      (sort)=\"sort($event)\"\n                      (filter)=\"filter($event)\">\n  </thead>\n\n  <tbody ng2-st-tbody [grid]=\"grid\"\n                      [source]=\"source\"\n                      [deleteConfirm]=\"deleteConfirm\"\n                      [editConfirm]=\"editConfirm\"\n                      [rowClassFunction]=\"rowClassFunction\"\n                      (edit)=\"edit.emit($event)\"\n                      (delete)=\"delete.emit($event)\"\n                      (custom)=\"custom.emit($event)\"\n                      (userSelectRow)=\"onUserSelectRow($event)\"\n                      (editRowSelect)=\"editRowSelect($event)\"\n                      (multipleSelectRow)=\"multipleSelectRow($event)\"\n                      (rowHover)=\"onRowHover($event)\">\n  </tbody>\n\n</table>\n\n<ng2-smart-table-pager *ngIf=\"isPagerDisplay\"\n                        [source]=\"source\"\n                        [perPageSelect]=\"perPageSelect\"\n                        (changePage)=\"changePage($event)\">\n</ng2-smart-table-pager>\n",
                styles: [":host{font-size:1rem}:host ::ng-deep *{box-sizing:border-box}:host ::ng-deep button,:host ::ng-deep input,:host ::ng-deep optgroup,:host ::ng-deep select,:host ::ng-deep textarea{color:inherit;font:inherit;margin:0}:host ::ng-deep table{border-collapse:collapse;border-spacing:0;display:table;line-height:1.5em;max-width:100%;overflow:auto;width:100%;word-break:normal;word-break:keep-all}:host ::ng-deep table tr th{font-weight:700}:host ::ng-deep table tr section{font-size:.75em;font-weight:700}:host ::ng-deep table tr td,:host ::ng-deep table tr th{font-size:.875em;margin:0;padding:.5em 1em}:host ::ng-deep a{color:#1e6bb8;text-decoration:none}:host ::ng-deep a:hover{text-decoration:underline}"]
            },] }
];
Ng2SmartTableComponent.propDecorators = {
    source: [{ type: Input }],
    settings: [{ type: Input }],
    rowSelect: [{ type: Output }],
    rowDeselect: [{ type: Output }],
    userRowSelect: [{ type: Output }],
    delete: [{ type: Output }],
    edit: [{ type: Output }],
    create: [{ type: Output }],
    custom: [{ type: Output }],
    deleteConfirm: [{ type: Output }],
    editConfirm: [{ type: Output }],
    createConfirm: [{ type: Output }],
    rowHover: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLXNtYXJ0LXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9hbHZhcm8vd29ya3NwYWNlL25nMi1zbWFydC10YWJsZS9wcm9qZWN0cy9uZzItc21hcnQtdGFibGUvc3JjLyIsInNvdXJjZXMiOlsibGliL25nMi1zbWFydC10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFnQixZQUFZLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQU81RSxNQUFNLE9BQU8sc0JBQXNCO0lBTG5DO1FBUVcsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUVyQixjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNwQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDdEMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3hDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2pDLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQy9CLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2pDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN4QyxnQkFBVyxH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cHV0LCBTaW1wbGVDaGFuZ2UsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBHcmlkIH0gZnJvbSAnLi9saWIvZ3JpZCc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9saWIvZGF0YS1zb3VyY2UvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgUm93IH0gZnJvbSAnLi9saWIvZGF0YS1zZXQvcm93JztcbmltcG9ydCB7IGRlZXBFeHRlbmQsIGdldFBhZ2VGb3JSb3dJbmRleCB9IGZyb20gJy4vbGliL2hlbHBlcnMnO1xuaW1wb3J0IHsgTG9jYWxEYXRhU291cmNlIH0gZnJvbSAnLi9saWIvZGF0YS1zb3VyY2UvbG9jYWwvbG9jYWwuZGF0YS1zb3VyY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZzItc21hcnQtdGFibGUnLFxuICBzdHlsZVVybHM6IFsnLi9uZzItc21hcnQtdGFibGUuY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICcuL25nMi1zbWFydC10YWJsZS5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE5nMlNtYXJ0VGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgc291cmNlOiBhbnk7XG4gIEBJbnB1dCgpIHNldHRpbmdzOiBPYmplY3QgPSB7fTtcblxuICBAT3V0cHV0KCkgcm93U2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSByb3dEZXNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgdXNlclJvd1NlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZGVsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBlZGl0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBjcmVhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGN1c3RvbSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZGVsZXRlQ29uZmlybSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZWRpdENvbmZpcm0gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGNyZWF0ZUNvbmZpcm0gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHJvd0hvdmVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHRhYmxlQ2xhc3M6IHN0cmluZztcbiAgdGFibGVJZDogc3RyaW5nO1xuICBwZXJQYWdlU2VsZWN0OiBhbnk7XG4gIGlzSGlkZUhlYWRlcjogYm9vbGVhbjtcbiAgaXNIaWRlU3ViSGVhZGVyOiBib29sZWFuO1xuICBpc1BhZ2VyRGlzcGxheTogYm9vbGVhbjtcbiAgcm93Q2xhc3NGdW5jdGlvbjogRnVuY3Rpb247XG5cbiAgZ3JpZDogR3JpZDtcbiAgZGVmYXVsdFNldHRpbmdzOiBPYmplY3QgPSB7XG4gICAgbW9kZTogJ2lubGluZScsIC8vIGlubGluZXxleHRlcm5hbHxjbGljay10by1lZGl0XG4gICAgc2VsZWN0TW9kZTogJ3NpbmdsZScsIC8vIHNpbmdsZXxtdWx0aVxuICAgIC8qKlxuICAgICAqIFBvaW50cyB0byBhbiBlbGVtZW50IGluIGFsbCBkYXRhXG4gICAgICpcbiAgICAgKiB3aGVuIDwgMCBhbGwgbGluZXMgbXVzdCBiZSBkZXNlbGVjdGVkXG4gICAgICovXG4gICAgc2VsZWN0ZWRSb3dJbmRleDogMCxcbiAgICBzd2l0Y2hQYWdlVG9TZWxlY3RlZFJvd1BhZ2U6IGZhbHNlLFxuICAgIGhpZGVIZWFkZXI6IGZhbHNlLFxuICAgIGhpZGVTdWJIZWFkZXI6IGZhbHNlLFxuICAgIGFjdGlvbnM6IHtcbiAgICAgIGNvbHVtblRpdGxlOiAnQWN0aW9ucycsXG4gICAgICBhZGQ6IHRydWUsXG4gICAgICBlZGl0OiB0cnVlLFxuICAgICAgZGVsZXRlOiB0cnVlLFxuICAgICAgY3VzdG9tOiBbXSxcbiAgICAgIHBvc2l0aW9uOiAnbGVmdCcsIC8vIGxlZnR8cmlnaHRcbiAgICB9LFxuICAgIGZpbHRlcjoge1xuICAgICAgaW5wdXRDbGFzczogJycsXG4gICAgfSxcbiAgICBlZGl0OiB7XG4gICAgICBpbnB1dENsYXNzOiAnJyxcbiAgICAgIGVkaXRCdXR0b25Db250ZW50OiAnRWRpdCcsXG4gICAgICBzYXZlQnV0dG9uQ29udGVudDogJ1VwZGF0ZScsXG4gICAgICBjYW5jZWxCdXR0b25Db250ZW50OiAnQ2FuY2VsJyxcbiAgICAgIGNvbmZpcm1TYXZlOiBmYWxzZSxcbiAgICB9LFxuICAgIGFkZDoge1xuICAgICAgaW5wdXRDbGFzczogJycsXG4gICAgICBhZGRCdXR0b25Db250ZW50OiAnQWRkIE5ldycsXG4gICAgICBjcmVhdGVCdXR0b25Db250ZW50OiAnQ3JlYXRlJyxcbiAgICAgIGNhbmNlbEJ1dHRvbkNvbnRlbnQ6ICdDYW5jZWwnLFxuICAgICAgY29uZmlybUNyZWF0ZTogZmFsc2UsXG4gICAgfSxcbiAgICBkZWxldGU6IHtcbiAgICAgIGRlbGV0ZUJ1dHRvbkNvbnRlbnQ6ICdEZWxldGUnLFxuICAgICAgY29uZmlybURlbGV0ZTogZmFsc2UsXG4gICAgfSxcbiAgICBhdHRyOiB7XG4gICAgICBpZDogJycsXG4gICAgICBjbGFzczogJycsXG4gICAgfSxcbiAgICBub0RhdGFNZXNzYWdlOiAnTm8gZGF0YSBmb3VuZCcsXG4gICAgY29sdW1uczoge30sXG4gICAgcGFnZXI6IHtcbiAgICAgIGRpc3BsYXk6IHRydWUsXG4gICAgICBwYWdlOiAxLFxuICAgICAgcGVyUGFnZTogMTAsXG4gICAgfSxcbiAgICByb3dDbGFzc0Z1bmN0aW9uOiAoKSA9PiAnJyxcbiAgfTtcblxuICBpc0FsbFNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBvblNlbGVjdFJvd1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIG9uRGVzZWxlY3RSb3dTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBkZXN0cm95ZWQkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XG4gICAgaWYgKHRoaXMuZ3JpZCkge1xuICAgICAgaWYgKGNoYW5nZXNbJ3NldHRpbmdzJ10pIHtcbiAgICAgICAgdGhpcy5ncmlkLnNldFNldHRpbmdzKHRoaXMucHJlcGFyZVNldHRpbmdzKCkpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZXNbJ3NvdXJjZSddKSB7XG4gICAgICAgIHRoaXMuc291cmNlID0gdGhpcy5wcmVwYXJlU291cmNlKCk7XG4gICAgICAgIHRoaXMuZ3JpZC5zZXRTb3VyY2UodGhpcy5zb3VyY2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluaXRHcmlkKCk7XG4gICAgfVxuICAgIHRoaXMudGFibGVJZCA9IHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdhdHRyLmlkJyk7XG4gICAgdGhpcy50YWJsZUNsYXNzID0gdGhpcy5ncmlkLmdldFNldHRpbmcoJ2F0dHIuY2xhc3MnKTtcbiAgICB0aGlzLmlzSGlkZUhlYWRlciA9IHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdoaWRlSGVhZGVyJyk7XG4gICAgdGhpcy5pc0hpZGVTdWJIZWFkZXIgPSB0aGlzLmdyaWQuZ2V0U2V0dGluZygnaGlkZVN1YkhlYWRlcicpO1xuICAgIHRoaXMuaXNQYWdlckRpc3BsYXkgPSB0aGlzLmdyaWQuZ2V0U2V0dGluZygncGFnZXIuZGlzcGxheScpO1xuICAgIHRoaXMuaXNQYWdlckRpc3BsYXkgPSB0aGlzLmdyaWQuZ2V0U2V0dGluZygncGFnZXIuZGlzcGxheScpO1xuICAgIHRoaXMucGVyUGFnZVNlbGVjdCA9IHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdwYWdlci5wZXJQYWdlU2VsZWN0Jyk7XG4gICAgdGhpcy5yb3dDbGFzc0Z1bmN0aW9uID0gdGhpcy5ncmlkLmdldFNldHRpbmcoJ3Jvd0NsYXNzRnVuY3Rpb24nKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveWVkJC5uZXh0KCk7XG4gIH1cblxuICBzZWxlY3RSb3coaW5kZXg6IG51bWJlciwgc3dpdGNoUGFnZVRvU2VsZWN0ZWRSb3dQYWdlOiBib29sZWFuID0gdGhpcy5ncmlkLmdldFNldHRpbmcoJ3N3aXRjaFBhZ2VUb1NlbGVjdGVkUm93UGFnZScpKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmdyaWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5ncmlkLnNldHRpbmdzLnNlbGVjdGVkUm93SW5kZXggPSBpbmRleDtcbiAgICBpZiAodGhpcy5pc0luZGV4T3V0T2ZSYW5nZShpbmRleCkpIHtcbiAgICAgIC8vIHdlIG5lZWQgdG8gZGVzZWxlY3QgYWxsIHJvd3MgaWYgd2UgZ290IGFuIGluY29ycmVjdCBpbmRleFxuICAgICAgdGhpcy5kZXNlbGVjdEFsbFJvd3MoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoc3dpdGNoUGFnZVRvU2VsZWN0ZWRSb3dQYWdlKSB7XG4gICAgICBjb25zdCBzb3VyY2U6IERhdGFTb3VyY2UgPSB0aGlzLnNvdXJjZTtcbiAgICAgIGNvbnN0IHBhZ2luZzogeyBwYWdlOiBudW1iZXIsIHBlclBhZ2U6IG51bWJlciB9ID0gc291cmNlLmdldFBhZ2luZygpO1xuICAgICAgY29uc3QgcGFnZTogbnVtYmVyID0gZ2V0UGFnZUZvclJvd0luZGV4KGluZGV4LCBwYWdpbmcucGVyUGFnZSk7XG4gICAgICBpbmRleCA9IGluZGV4ICUgcGFnaW5nLnBlclBhZ2U7XG4gICAgICB0aGlzLmdyaWQuc2V0dGluZ3Muc2VsZWN0ZWRSb3dJbmRleCA9IGluZGV4O1xuXG4gICAgICBpZiAocGFnZSAhPT0gcGFnaW5nLnBhZ2UpIHtcbiAgICAgICAgc291cmNlLnNldFBhZ2UocGFnZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIGNvbnN0IHJvdzogUm93ID0gdGhpcy5ncmlkLmdldFJvd3MoKVtpbmRleF07XG4gICAgaWYgKHJvdykge1xuICAgICAgdGhpcy5vblNlbGVjdFJvdyhyb3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB3ZSBuZWVkIHRvIGRlc2VsZWN0IGFsbCByb3dzIGlmIHdlIGdvdCBhbiBpbmNvcnJlY3QgaW5kZXhcbiAgICAgIHRoaXMuZGVzZWxlY3RBbGxSb3dzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXNlbGVjdEFsbFJvd3MoKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkLmRhdGFTZXQuZGVzZWxlY3RBbGwoKTtcbiAgICB0aGlzLmVtaXREZXNlbGVjdFJvdyhudWxsKTtcbiAgfVxuXG4gIGVkaXRSb3dTZWxlY3Qocm93OiBSb3cpIHtcbiAgICBpZiAodGhpcy5ncmlkLmdldFNldHRpbmcoJ3NlbGVjdE1vZGUnKSA9PT0gJ211bHRpJykge1xuICAgICAgdGhpcy5vbk11bHRpcGxlU2VsZWN0Um93KHJvdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25TZWxlY3RSb3cocm93KTtcbiAgICB9XG4gIH1cblxuICBvblVzZXJTZWxlY3RSb3cocm93OiBSb3cpIHtcbiAgICBpZiAodGhpcy5ncmlkLmdldFNldHRpbmcoJ3NlbGVjdE1vZGUnKSAhPT0gJ211bHRpJykge1xuICAgICAgdGhpcy5ncmlkLnNlbGVjdFJvdyhyb3cpO1xuICAgICAgdGhpcy5lbWl0VXNlclNlbGVjdFJvdyhyb3cpO1xuICAgICAgdGhpcy5lbWl0U2VsZWN0Um93KHJvdyk7XG4gICAgfVxuICB9XG5cbiAgb25Sb3dIb3Zlcihyb3c6IFJvdykge1xuICAgIHRoaXMucm93SG92ZXIuZW1pdChyb3cpO1xuICB9XG5cbiAgbXVsdGlwbGVTZWxlY3RSb3cocm93OiBSb3cpIHtcbiAgICB0aGlzLmdyaWQubXVsdGlwbGVTZWxlY3RSb3cocm93KTtcbiAgICB0aGlzLmVtaXRVc2VyU2VsZWN0Um93KHJvdyk7XG4gICAgdGhpcy5lbWl0U2VsZWN0Um93KHJvdyk7XG4gIH1cblxuICBvblNlbGVjdEFsbFJvd3MoJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmlzQWxsU2VsZWN0ZWQgPSAhdGhpcy5pc0FsbFNlbGVjdGVkO1xuICAgIHRoaXMuZ3JpZC5zZWxlY3RBbGxSb3dzKHRoaXMuaXNBbGxTZWxlY3RlZCk7XG5cbiAgICB0aGlzLmVtaXRVc2VyU2VsZWN0Um93KG51bGwpO1xuICAgIHRoaXMuZW1pdFNlbGVjdFJvdyhudWxsKTtcbiAgfVxuXG4gIG9uU2VsZWN0Um93KHJvdzogUm93KSB7XG4gICAgdGhpcy5ncmlkLnNlbGVjdFJvdyhyb3cpO1xuICAgIHRoaXMuZW1pdFNlbGVjdFJvdyhyb3cpO1xuICB9XG5cbiAgb25NdWx0aXBsZVNlbGVjdFJvdyhyb3c6IFJvdykge1xuICAgIHRoaXMuZW1pdFNlbGVjdFJvdyhyb3cpO1xuICB9XG5cbiAgaW5pdEdyaWQoKSB7XG4gICAgdGhpcy5zb3VyY2UgPSB0aGlzLnByZXBhcmVTb3VyY2UoKTtcbiAgICB0aGlzLmdyaWQgPSBuZXcgR3JpZCh0aGlzLnNvdXJjZSwgdGhpcy5wcmVwYXJlU2V0dGluZ3MoKSk7XG5cbiAgICB0aGlzLnN1YnNjcmliZVRvT25TZWxlY3RSb3coKTtcbiAgICB0aGlzLnN1YnNjcmliZVRvT25EZXNlbGVjdFJvdygpO1xuICB9XG5cbiAgcHJlcGFyZVNvdXJjZSgpOiBEYXRhU291cmNlIHtcbiAgICBpZiAodGhpcy5zb3VyY2UgaW5zdGFuY2VvZiBEYXRhU291cmNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zb3VyY2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNvdXJjZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICByZXR1cm4gbmV3IExvY2FsRGF0YVNvdXJjZSh0aGlzLnNvdXJjZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBMb2NhbERhdGFTb3VyY2UoKTtcbiAgfVxuXG4gIHByZXBhcmVTZXR0aW5ncygpOiBPYmplY3Qge1xuICAgIHJldHVybiBkZWVwRXh0ZW5kKHt9LCB0aGlzLmRlZmF1bHRTZXR0aW5ncywgdGhpcy5zZXR0aW5ncyk7XG4gIH1cblxuICBjaGFuZ2VQYWdlKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5yZXNldEFsbFNlbGVjdG9yKCk7XG4gIH1cblxuICBzb3J0KCRldmVudDogYW55KSB7XG4gICAgdGhpcy5yZXNldEFsbFNlbGVjdG9yKCk7XG4gIH1cblxuICBmaWx0ZXIoJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnJlc2V0QWxsU2VsZWN0b3IoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRBbGxTZWxlY3RvcigpIHtcbiAgICB0aGlzLmlzQWxsU2VsZWN0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgZW1pdFVzZXJTZWxlY3RSb3cocm93OiBSb3cpIHtcbiAgICBjb25zdCBzZWxlY3RlZFJvd3MgPSB0aGlzLmdyaWQuZ2V0U2VsZWN0ZWRSb3dzKCk7XG5cbiAgICB0aGlzLnVzZXJSb3dTZWxlY3QuZW1pdCh7XG4gICAgICBkYXRhOiByb3cgPyByb3cuZ2V0RGF0YSgpIDogbnVsbCxcbiAgICAgIGlzU2VsZWN0ZWQ6IHJvdyA/IHJvdy5nZXRJc1NlbGVjdGVkKCkgOiBudWxsLFxuICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZFJvd3MgJiYgc2VsZWN0ZWRSb3dzLmxlbmd0aCA/IHNlbGVjdGVkUm93cy5tYXAoKHI6IFJvdykgPT4gci5nZXREYXRhKCkpIDogW10sXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGVtaXRTZWxlY3RSb3cocm93OiBSb3cpIHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgZGF0YTogcm93ID8gcm93LmdldERhdGEoKSA6IG51bGwsXG4gICAgICBpc1NlbGVjdGVkOiByb3cgPyByb3cuZ2V0SXNTZWxlY3RlZCgpIDogbnVsbCxcbiAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgfTtcbiAgICB0aGlzLnJvd1NlbGVjdC5lbWl0KGRhdGEpO1xuICAgIGlmICghcm93Py5pc1NlbGVjdGVkKSB7XG4gICAgICB0aGlzLnJvd0Rlc2VsZWN0LmVtaXQoZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBlbWl0RGVzZWxlY3RSb3cocm93OiBSb3cpOiB2b2lkIHtcbiAgICB0aGlzLnJvd0Rlc2VsZWN0LmVtaXQoe1xuICAgICAgZGF0YTogcm93ID8gcm93LmdldERhdGEoKSA6IG51bGwsXG4gICAgICBpc1NlbGVjdGVkOiByb3cgPyByb3cuZ2V0SXNTZWxlY3RlZCgpIDogbnVsbCxcbiAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGlzSW5kZXhPdXRPZlJhbmdlKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRhQW1vdW50OiBudW1iZXIgPSB0aGlzLnNvdXJjZT8uY291bnQoKTtcbiAgICByZXR1cm4gaW5kZXggPCAwIHx8ICh0eXBlb2YgZGF0YUFtb3VudCA9PT0gJ251bWJlcicgJiYgaW5kZXggPj0gZGF0YUFtb3VudCk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvT25TZWxlY3RSb3coKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub25TZWxlY3RSb3dTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMub25TZWxlY3RSb3dTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgdGhpcy5vblNlbGVjdFJvd1N1YnNjcmlwdGlvbiA9IHRoaXMuZ3JpZC5vblNlbGVjdFJvdygpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSlcbiAgICAgIC5zdWJzY3JpYmUoKHJvdykgPT4ge1xuICAgICAgICB0aGlzLmVtaXRTZWxlY3RSb3cocm93KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb09uRGVzZWxlY3RSb3coKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub25EZXNlbGVjdFJvd1N1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5vbkRlc2VsZWN0Um93U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHRoaXMub25EZXNlbGVjdFJvd1N1YnNjcmlwdGlvbiA9IHRoaXMuZ3JpZC5vbkRlc2VsZWN0Um93KClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpKVxuICAgICAgLnN1YnNjcmliZSgocm93KSA9PiB7XG4gICAgICAgIHRoaXMuZW1pdERlc2VsZWN0Um93KHJvdyk7XG4gICAgICB9KTtcbiAgfVxuXG59XG4iXX0=