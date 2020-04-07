import { Component } from '@angular/core';
import { ManualStintPlanning } from 'src/app/services/ManualStintPlanning';
import { FuelCalculation } from 'src/app/services/FuelCalculation';
import { Subscription } from 'rxjs';

@Component({
    selector: 'stints-manual',
    templateUrl: './stintsManual.component.html',
    styleUrls: ['./stintsManual.component.css']
})
export class StintsManual {
    _fuelCalcSubscription: Subscription;

    constructor(public stintPlanning: ManualStintPlanning, public fuelCalculation: FuelCalculation) {
        this._fuelCalcSubscription = fuelCalculation.calculationChange.subscribe((result) => {
            this.stintPlanning.updateCalculations(this.fuelCalculation);
        });
    }

    ngOnInit() {
        this.stintPlanning.read();
    }

    ngOnDestroy() {
        this._fuelCalcSubscription.unsubscribe();
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