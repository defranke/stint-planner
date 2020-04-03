import { Component, Input, Output, EventEmitter } from '@angular/core';
import { round } from 'src/app/utils/numberUtils';


@Component({
    selector: 'number-stepper',
    templateUrl: './numberStepper.component.html'
})
export class NumberStepper {
    @Input() id: String;

    @Input() value: number = 0;
    @Output() valueChange = new EventEmitter<number>();
    @Input() step: number = 1;

    @Input() prependLabel: string;
    @Input() appendLabel: string;

    valueChanged(newValue: number) {
        this.valueChange.emit(newValue);
    }

    increaseValue() {
        const newValue = this.value + this.step;
        this.valueChange.emit(round(newValue, 1));
    }

    decreaseValue() {
        const newValue = this.value - this.step;
        this.valueChange.emit(round(newValue, 1));
    }
}