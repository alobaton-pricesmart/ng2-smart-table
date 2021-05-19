import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2CompleterModule } from 'ng2-completer';
import { CellComponent } from './cell.component';
import { CustomEditComponent } from './cell-edit-mode/custom-edit.component';
import { DefaultEditComponent } from './cell-edit-mode/default-edit.component';
import { EditCellComponent } from './cell-edit-mode/edit-cell.component';
import { CheckboxEditorComponent } from './cell-editors/checkbox-editor.component';
import { CompleterEditorComponent } from './cell-editors/completer-editor.component';
import { InputEditorComponent } from './cell-editors/input-editor.component';
import { SelectEditorComponent } from './cell-editors/select-editor.component';
import { TextareaEditorComponent } from './cell-editors/textarea-editor.component';
import { CustomViewComponent } from './cell-view-mode/custom-view.component';
import { ViewCellComponent } from './cell-view-mode/view-cell.component';
import { EditCellDefault } from './cell-edit-mode/edit-cell-default';
import { DefaultEditor } from './cell-editors/default-editor';
const CELL_COMPONENTS = [
    CellComponent,
    EditCellDefault,
    DefaultEditor,
    CustomEditComponent,
    DefaultEditComponent,
    EditCellComponent,
    CheckboxEditorComponent,
    CompleterEditorComponent,
    InputEditorComponent,
    SelectEditorComponent,
    TextareaEditorComponent,
    CustomViewComponent,
    ViewCellComponent,
];
export class CellModule {
}
CellModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    Ng2CompleterModule,
                ],
                declarations: [
                    ...CELL_COMPONENTS,
                ],
                exports: [
                    ...CELL_COMPONENTS,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvYWx2YXJvL3dvcmtzcGFjZS9uZzItc21hcnQtdGFibGUvcHJvamVjdHMvbmcyLXNtYXJ0LXRhYmxlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2NlbGwvY2VsbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDekUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDckYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDbkYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUU5RCxNQUFNLGVBQWUsR0FBRztJQUN0QixhQUFhO0lBQ2IsZUFBZTtJQUNmLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsb0JBQW9CO0lBQ3BCLGlCQUFpQjtJQUNqQix1QkFBdUI7SUFDdkIsd0JBQXdCO0lBQ3hCLG9CQUFvQjtJQUNwQixxQkFBcUI7SUFDckIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixpQkFBaUI7Q0FDbEIsQ0FBQztBQWVGLE1BQU0sT0FBTyxVQUFVOzs7WUFidEIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsa0JBQWtCO2lCQUNuQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osR0FBRyxlQUFlO2lCQUNuQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsR0FBRyxlQUFlO2lCQUNuQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5nMkNvbXBsZXRlck1vZHVsZSB9IGZyb20gJ25nMi1jb21wbGV0ZXInO1xuXG5pbXBvcnQgeyBDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDdXN0b21FZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jZWxsLWVkaXQtbW9kZS9jdXN0b20tZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVmYXVsdEVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NlbGwtZWRpdC1tb2RlL2RlZmF1bHQtZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRWRpdENlbGxDb21wb25lbnQgfSBmcm9tICcuL2NlbGwtZWRpdC1tb2RlL2VkaXQtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2hlY2tib3hFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL2NlbGwtZWRpdG9ycy9jaGVja2JveC1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IENvbXBsZXRlckVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vY2VsbC1lZGl0b3JzL2NvbXBsZXRlci1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IElucHV0RWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9jZWxsLWVkaXRvcnMvaW5wdXQtZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL2NlbGwtZWRpdG9ycy9zZWxlY3QtZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZXh0YXJlYUVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vY2VsbC1lZGl0b3JzL3RleHRhcmVhLWVkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3VzdG9tVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2VsbC12aWV3LW1vZGUvY3VzdG9tLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9jZWxsLXZpZXctbW9kZS92aWV3LWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IEVkaXRDZWxsRGVmYXVsdCB9IGZyb20gJy4vY2VsbC1lZGl0LW1vZGUvZWRpdC1jZWxsLWRlZmF1bHQnO1xuaW1wb3J0IHsgRGVmYXVsdEVkaXRvciB9IGZyb20gJy4vY2VsbC1lZGl0b3JzL2RlZmF1bHQtZWRpdG9yJztcblxuY29uc3QgQ0VMTF9DT01QT05FTlRTID0gW1xuICBDZWxsQ29tcG9uZW50LFxuICBFZGl0Q2VsbERlZmF1bHQsXG4gIERlZmF1bHRFZGl0b3IsXG4gIEN1c3RvbUVkaXRDb21wb25lbnQsXG4gIERlZmF1bHRFZGl0Q29tcG9uZW50LFxuICBFZGl0Q2VsbENvbXBvbmVudCxcbiAgQ2hlY2tib3hFZGl0b3JDb21wb25lbnQsXG4gIENvbXBsZXRlckVkaXRvckNvbXBvbmVudCxcbiAgSW5wdXRFZGl0b3JDb21wb25lbnQsXG4gIFNlbGVjdEVkaXRvckNvbXBvbmVudCxcbiAgVGV4dGFyZWFFZGl0b3JDb21wb25lbnQsXG4gIEN1c3RvbVZpZXdDb21wb25lbnQsXG4gIFZpZXdDZWxsQ29tcG9uZW50LFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBOZzJDb21wbGV0ZXJNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIC4uLkNFTExfQ09NUE9ORU5UUyxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIC4uLkNFTExfQ09NUE9ORU5UUyxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2VsbE1vZHVsZSB7IH1cbiJdfQ==