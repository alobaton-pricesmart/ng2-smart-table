import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Cell } from '../../../lib/data-set/cell';
export class ViewCellComponent {
}
ViewCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'table-cell-view-mode',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div [ngSwitch]="cell.getColumn().type">
        <custom-view-component *ngSwitchCase="'custom'" [cell]="cell"></custom-view-component>
        <div *ngSwitchCase="'html'" [innerHTML]="cell.getValue()"></div>
        <div *ngSwitchDefault>{{ cell.getValue() }}</div>
    </div>
    `
            },] }
];
ViewCellComponent.propDecorators = {
    cell: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9hbHZhcm8vd29ya3NwYWNlL25nMi1zbWFydC10YWJsZS9wcm9qZWN0cy9uZzItc21hcnQtdGFibGUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY2VsbC9jZWxsLXZpZXctbW9kZS92aWV3LWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQWFsRCxNQUFNLE9BQU8saUJBQWlCOzs7WUFYN0IsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxRQUFRLEVBQUU7Ozs7OztLQU1QO2FBQ0o7OzttQkFHRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDZWxsIH0gZnJvbSAnLi4vLi4vLi4vbGliL2RhdGEtc2V0L2NlbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0YWJsZS1jZWxsLXZpZXctbW9kZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW25nU3dpdGNoXT1cImNlbGwuZ2V0Q29sdW1uKCkudHlwZVwiPlxuICAgICAgICA8Y3VzdG9tLXZpZXctY29tcG9uZW50ICpuZ1N3aXRjaENhc2U9XCInY3VzdG9tJ1wiIFtjZWxsXT1cImNlbGxcIj48L2N1c3RvbS12aWV3LWNvbXBvbmVudD5cbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2h0bWwnXCIgW2lubmVySFRNTF09XCJjZWxsLmdldFZhbHVlKClcIj48L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hEZWZhdWx0Pnt7IGNlbGwuZ2V0VmFsdWUoKSB9fTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIFZpZXdDZWxsQ29tcG9uZW50IHtcblxuICBASW5wdXQoKSBjZWxsOiBDZWxsO1xufVxuIl19