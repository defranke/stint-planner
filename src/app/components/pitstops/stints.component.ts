import { Component } from '@angular/core';
import { StintCalculation, Stint, StintOptions } from 'src/app/services/StintCalculation';
import { Subscription } from 'rxjs';
import { FuelCalculation } from 'src/app/services/FuelCalculation';

@Component({
    selector: 'stints',
    templateUrl: './stints.component.html',
    styleUrls: ['./stints.component.css']
})
export class PitStops {
    _fuelCalcSubscription: Subscription;
    _subscription: Subscription;

    stints: Array<Stint> = [];

    optionsVisible: boolean = false;
    stintOptions: StintOptions = new StintOptions();

    constructor(private fuelCalculation: FuelCalculation,
        private stintCalculation: StintCalculation) {

        this._fuelCalcSubscription = fuelCalculation.calculationChange.subscribe((result) => {
            this.calculatePitStops();
        });

        this._subscription = stintCalculation.calculationChange.subscribe(() => {
            this.stints = stintCalculation.pitStops;
        });
    }

    optionsChanged() {
        this.saveData();
        this.calculatePitStops();
    }

    calculatePitStops() {
        this.stintCalculation.generateStints(this.fuelCalculation, this.stintOptions);
    }

    ngOnInit() {
        this.readData();
    }

    toggleOptionsVisibility() {
        this.optionsVisible = !this.optionsVisible;
    }

    ngOnDestroy() {
        this._fuelCalcSubscription.unsubscribe();
        this._subscription.unsubscribe();
    }

    saveData() {
        localStorage.setItem('stintOptions', JSON.stringify(this.stintOptions));
    }

    readData() {
        const dataString = localStorage.getItem('stintOptions');
        if (dataString) {
            this.stintOptions = JSON.parse(dataString);
            this.calculatePitStops();
        }
    }

    resetOptions() {
        this.stintOptions = new StintOptions();
        this.optionsChanged();
    }
}