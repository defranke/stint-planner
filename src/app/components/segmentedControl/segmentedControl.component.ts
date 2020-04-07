import { Component, Input, Output, EventEmitter } from '@angular/core';

export class SegmentedControlOption {
    id: string
    label: string
    value: any

    constructor(id: string, label: string, value: any) {
        this.id = id;
        this.label = label;
        this.value = value;
    }
}

@Component({
    selector: 'segmented-control',
    templateUrl: './segmentedControl.component.html',
    styleUrls: ['./segmentedControl.component.css']
})
export class SegmentedControl {

    @Input() options: Array<SegmentedControlOption>
    @Input() value: any;
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    selectValue(option: SegmentedControlOption) {
        this.valueChange.emit(option.value);
    }
}