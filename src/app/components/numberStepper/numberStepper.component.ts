import { Component, Input, Output, EventEmitter } from '@angular/core';


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
        this.valueChange.emit(this.value + this.step);
    }

    decreaseValue() {
        this.valueChange.emit(this.value - this.step);
    }
}