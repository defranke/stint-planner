import { Component } from '@angular/core';
import { ManualStintPlanning } from 'src/app/services/ManualStintPlanning';
import { FuelCalculation } from 'src/app/services/FuelCalculation';

@Component({
    selector: 'stints-manual',
    templateUrl: './stintsManual.component.html',
    styleUrls: ['./stintsManual.component.css']
})
export class StintsManual {

    constructor(public stintPlanning: ManualStintPlanning, private fuelCalculation: FuelCalculation) {}

    ngOnInit() {
        this.stintPlanning.read();
    }

    addStint() {
        this.stintPlanning.addStint();
    }

    cloneStint(index: number) {
        this.stintPlanning.duplicateStint(index);
        this.stintPlanning.updateCalculations(this.fuelCalculation);
    }

    removeStint(index: number) {
        this.stintPlanning.removeStint(index);
        this.stintPlanning.updateCalculations(this.fuelCalculation);
    }

    autofillTargetFuel(stintIndex: number) {
        this.stintPlanning.autofillTargetFuel(stintIndex, this.fuelCalculation);
        this.stintPlanning.updateCalculations(this.fuelCalculation);
    }

    autofillTargetLaps(stintIndex: number) {
        this.stintPlanning.autofillTargetLaps(stintIndex, this.fuelCalculation);
        this.stintPlanning.updateCalculations(this.fuelCalculation);
    }

    updateCalculations() {
        this.stintPlanning.updateCalculations(this.fuelCalculation);
    }
}