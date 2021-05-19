import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterModule } from '../filter/filter.module';
import { CellModule } from '../cell/cell.module';
import { Ng2SmartTableTheadComponent } from './thead.component';
import { ActionsComponent } from './cells/actions.component';
import { ActionsTitleComponent } from './cells/actions-title.component';
import { AddButtonComponent } from './cells/add-button.component';
import { CheckboxSelectAllComponent } from './cells/checkbox-select-all.component';
import { ColumnTitleComponent } from './cells/column-title.component';
import { TitleComponent } from './cells/title/title.component';
import { TheadFitlersRowComponent } from './rows/thead-filters-row.component';
import { TheadFormRowComponent } from './rows/thead-form-row.component';
import { TheadTitlesRowComponent } from './rows/thead-titles-row.component';
const THEAD_COMPONENTS = [
    ActionsComponent,
    ActionsTitleComponent,
    AddButtonComponent,
    CheckboxSelectAllComponent,
    ColumnTitleComponent,
    TitleComponent,
    TheadFitlersRowComponent,
    TheadFormRowComponent,
    TheadTitlesRowComponent,
    Ng2SmartTableTheadComponent,
];
export class THeadModule {
}
THeadModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    FilterModule,
                    CellModule,
                ],
                declarations: [
                    ...THEAD_COMPONENTS,
                ],
                exports: [
                    ...THEAD_COMPONENTS,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlYWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2FsdmFyby93b3Jrc3BhY2UvbmcyLXNtYXJ0LXRhYmxlL3Byb2plY3RzL25nMi1zbWFydC10YWJsZS9zcmMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy90aGVhZC90aGVhZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFakQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDbkYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRTVFLE1BQU0sZ0JBQWdCLEdBQUc7SUFDdkIsZ0JBQWdCO0lBQ2hCLHFCQUFxQjtJQUNyQixrQkFBa0I7SUFDbEIsMEJBQTBCO0lBQzFCLG9CQUFvQjtJQUNwQixjQUFjO0lBQ2Qsd0JBQXdCO0lBQ3hCLHFCQUFxQjtJQUNyQix1QkFBdUI7SUFDdkIsMkJBQTJCO0NBQzVCLENBQUM7QUFnQkYsTUFBTSxPQUFPLFdBQVc7OztZQWR2QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxZQUFZO29CQUNaLFVBQVU7aUJBQ1g7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLEdBQUcsZ0JBQWdCO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsR0FBRyxnQkFBZ0I7aUJBQ3BCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBGaWx0ZXJNb2R1bGUgfSBmcm9tICcuLi9maWx0ZXIvZmlsdGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBDZWxsTW9kdWxlIH0gZnJvbSAnLi4vY2VsbC9jZWxsLm1vZHVsZSc7XG5cbmltcG9ydCB7IE5nMlNtYXJ0VGFibGVUaGVhZENvbXBvbmVudCB9IGZyb20gJy4vdGhlYWQuY29tcG9uZW50JztcbmltcG9ydCB7IEFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2NlbGxzL2FjdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IEFjdGlvbnNUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vY2VsbHMvYWN0aW9ucy10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWRkQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9jZWxscy9hZGQtYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaGVja2JveFNlbGVjdEFsbENvbXBvbmVudCB9IGZyb20gJy4vY2VsbHMvY2hlY2tib3gtc2VsZWN0LWFsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sdW1uVGl0bGVDb21wb25lbnQgfSBmcm9tICcuL2NlbGxzL2NvbHVtbi10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGl0bGVDb21wb25lbnQgfSBmcm9tICcuL2NlbGxzL3RpdGxlL3RpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaGVhZEZpdGxlcnNSb3dDb21wb25lbnQgfSBmcm9tICcuL3Jvd3MvdGhlYWQtZmlsdGVycy1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7IFRoZWFkRm9ybVJvd0NvbXBvbmVudCB9IGZyb20gJy4vcm93cy90aGVhZC1mb3JtLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGhlYWRUaXRsZXNSb3dDb21wb25lbnQgfSBmcm9tICcuL3Jvd3MvdGhlYWQtdGl0bGVzLXJvdy5jb21wb25lbnQnO1xuXG5jb25zdCBUSEVBRF9DT01QT05FTlRTID0gW1xuICBBY3Rpb25zQ29tcG9uZW50LFxuICBBY3Rpb25zVGl0bGVDb21wb25lbnQsXG4gIEFkZEJ1dHRvbkNvbXBvbmVudCxcbiAgQ2hlY2tib3hTZWxlY3RBbGxDb21wb25lbnQsXG4gIENvbHVtblRpdGxlQ29tcG9uZW50LFxuICBUaXRsZUNvbXBvbmVudCxcbiAgVGhlYWRGaXRsZXJzUm93Q29tcG9uZW50LFxuICBUaGVhZEZvcm1Sb3dDb21wb25lbnQsXG4gIFRoZWFkVGl0bGVzUm93Q29tcG9uZW50LFxuICBOZzJTbWFydFRhYmxlVGhlYWRDb21wb25lbnQsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIEZpbHRlck1vZHVsZSxcbiAgICBDZWxsTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAuLi5USEVBRF9DT01QT05FTlRTLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgLi4uVEhFQURfQ09NUE9ORU5UUyxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVEhlYWRNb2R1bGUgeyB9XG4iXX0=