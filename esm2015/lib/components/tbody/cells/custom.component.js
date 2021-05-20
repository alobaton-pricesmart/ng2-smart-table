import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Row } from '../../../lib/data-set/row';
import { Grid } from '../../../lib/grid';
export class TbodyCustomComponent {
    constructor() {
        this.custom = new EventEmitter();
    }
    isDisabled(action) {
        return action.disabledFunction ? action.disabledFunction(this.row.getData()) : false;
    }
    onCustom(action, event) {
        event.preventDefault();
        event.stopPropagation();
        this.custom.emit({
            action: action.name,
            data: this.row.getData(),
            source: this.source
        });
    }
}
TbodyCustomComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng2-st-tbody-custom',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
      <a *ngFor="let action of grid.getSetting('actions.custom')" href="#"
         class="ng2-smart-action ng2-smart-action-custom-custom"
         [innerHTML]="action.title"
         [class.disabled]="isDisabled(action)"
         [attr.disabled]="isDisabled(action)"
         (click)="onCustom(action, $event)"></a>
        `
            },] }
];
TbodyCustomComponent.propDecorators = {
    grid: [{ type: Input }],
    row: [{ type: Input }],
    source: [{ type: Input }],
    custom: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9hbHZhcm8vd29ya3NwYWNlL25nMi1zbWFydC10YWJsZS9wcm9qZWN0cy9uZzItc21hcnQtdGFibGUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvdGJvZHkvY2VsbHMvY3VzdG9tLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFjekMsTUFBTSxPQUFPLG9CQUFvQjtJQVpqQztRQWlCWSxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQWlCN0MsQ0FBQztJQWZDLFVBQVUsQ0FBQyxNQUFXO1FBQ3BCLE9BQU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDdkYsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFXLEVBQUUsS0FBVTtRQUM5QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2YsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1lBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUN4QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBaENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOzs7Ozs7O1NBT0g7YUFDUjs7O21CQUdFLEtBQUs7a0JBQ0wsS0FBSztxQkFDTCxLQUFLO3FCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdyB9IGZyb20gJy4uLy4uLy4uL2xpYi9kYXRhLXNldC9yb3cnO1xuXG5pbXBvcnQgeyBHcmlkIH0gZnJvbSAnLi4vLi4vLi4vbGliL2dyaWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZzItc3QtdGJvZHktY3VzdG9tJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8YSAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIGdyaWQuZ2V0U2V0dGluZygnYWN0aW9ucy5jdXN0b20nKVwiIGhyZWY9XCIjXCJcbiAgICAgICAgIGNsYXNzPVwibmcyLXNtYXJ0LWFjdGlvbiBuZzItc21hcnQtYWN0aW9uLWN1c3RvbS1jdXN0b21cIlxuICAgICAgICAgW2lubmVySFRNTF09XCJhY3Rpb24udGl0bGVcIlxuICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzRGlzYWJsZWQoYWN0aW9uKVwiXG4gICAgICAgICBbYXR0ci5kaXNhYmxlZF09XCJpc0Rpc2FibGVkKGFjdGlvbilcIlxuICAgICAgICAgKGNsaWNrKT1cIm9uQ3VzdG9tKGFjdGlvbiwgJGV2ZW50KVwiPjwvYT5cbiAgICAgICAgYFxufSlcbmV4cG9ydCBjbGFzcyBUYm9keUN1c3RvbUNvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgZ3JpZDogR3JpZDtcbiAgQElucHV0KCkgcm93OiBSb3c7XG4gIEBJbnB1dCgpIHNvdXJjZTogYW55O1xuICBAT3V0cHV0KCkgY3VzdG9tID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgaXNEaXNhYmxlZChhY3Rpb246IGFueSkge1xuICAgIHJldHVybiBhY3Rpb24uZGlzYWJsZWRGdW5jdGlvbiA/IGFjdGlvbi5kaXNhYmxlZEZ1bmN0aW9uKHRoaXMucm93LmdldERhdGEoKSkgOiBmYWxzZTtcbiAgfVxuXG4gIG9uQ3VzdG9tKGFjdGlvbjogYW55LCBldmVudDogYW55KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuY3VzdG9tLmVtaXQoe1xuICAgICAgYWN0aW9uOiBhY3Rpb24ubmFtZSxcbiAgICAgIGRhdGE6IHRoaXMucm93LmdldERhdGEoKSxcbiAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2VcbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=