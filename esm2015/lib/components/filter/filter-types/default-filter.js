import { Input, Output, EventEmitter, Component } from '@angular/core';
import { Column } from '../../../lib/data-set/column';
export class DefaultFilter {
    constructor() {
        this.delay = 300;
        this.filter = new EventEmitter();
    }
    ngOnDestroy() {
        if (this.changesSubscription) {
            this.changesSubscription.unsubscribe();
        }
    }
    setFilter() {
        this.filter.emit(this.query);
    }
}
DefaultFilter.decorators = [
    { type: Component, args: [{
                template: ''
            },] }
];
DefaultFilter.propDecorators = {
    query: [{ type: Input }],
    inputClass: [{ type: Input }],
    column: [{ type: Input }],
    filter: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvYWx2YXJvL3dvcmtzcGFjZS9uZzItc21hcnQtdGFibGUvcHJvamVjdHMvbmcyLXNtYXJ0LXRhYmxlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2ZpbHRlci9maWx0ZXItdHlwZXMvZGVmYXVsdC1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdsRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFLdEQsTUFBTSxPQUFPLGFBQWE7SUFIMUI7UUFLRSxVQUFLLEdBQVcsR0FBRyxDQUFDO1FBS1YsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFXaEQsQ0FBQztJQVRDLFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7WUFwQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxFQUFFO2FBQ2I7OztvQkFLRSxLQUFLO3lCQUNMLEtBQUs7cUJBQ0wsS0FBSztxQkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENvbHVtbiB9IGZyb20gJy4uLy4uLy4uL2xpYi9kYXRhLXNldC9jb2x1bW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGU6ICcnLFxufSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0RmlsdGVyIGltcGxlbWVudHMgRmlsdGVyLCBPbkRlc3Ryb3kge1xuXG4gIGRlbGF5OiBudW1iZXIgPSAzMDA7XG4gIGNoYW5nZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgQElucHV0KCkgcXVlcnk6IHN0cmluZztcbiAgQElucHV0KCkgaW5wdXRDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBjb2x1bW46IENvbHVtbjtcbiAgQE91dHB1dCgpIGZpbHRlciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmNoYW5nZXNTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuY2hhbmdlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldEZpbHRlcigpIHtcbiAgICB0aGlzLmZpbHRlci5lbWl0KHRoaXMucXVlcnkpO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcblxuICBkZWxheT86IG51bWJlcjtcbiAgY2hhbmdlc1N1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbjtcbiAgcXVlcnk6IHN0cmluZztcbiAgaW5wdXRDbGFzczogc3RyaW5nO1xuICBjb2x1bW46IENvbHVtbjtcbiAgZmlsdGVyOiBFdmVudEVtaXR0ZXI8c3RyaW5nPjtcbn1cbiJdfQ==