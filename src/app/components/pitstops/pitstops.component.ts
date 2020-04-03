import { Component } from '@angular/core';
import { PitStopCalculation, PitStop, PitstopOptions } from 'src/app/services/PitStopCalculation';
import { Subscription } from 'rxjs';
import { FuelCalculation } from 'src/app/services/FuelCalculation';

@Component({
    selector: 'pit-stops',
    templateUrl: './pitstops.component.html',
    styleUrls: ['./pitstops.component.css']
})
export class PitStops {
    _fuelCalcSubscription: Subscription;
    _subscription: Subscription;

    pitStops: Array<PitStop> = [];

    optionsVisible: boolean = false;
    pitStopOptions: PitstopOptions = new PitstopOptions();

    constructor(private fuelCalculation: FuelCalculation,
        private pitStopCalculation: PitStopCalculation) {

        this._fuelCalcSubscription = fuelCalculation.calculationChange.subscribe((result) => {
            this.calculatePitStops();
        });

        this._subscription = pitStopCalculation.calculationChange.subscribe(() => {
            this.pitStops = pitStopCalculation.pitStops;
        });
    }

    optionsChanged() {
        this.saveData();
        this.calculatePitStops();
    }

    calculatePitStops() {
        this.pitStopCalculation.generatePitstops(this.fuelCalculation, this.pitStopOptions);
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
        localStorage.setItem('pitStopOptions', JSON.stringify(this.pitStopOptions));
    }

    readData() {
        const dataString = localStorage.getItem('pitStopOptions');
        if (dataString) {
            this.pitStopOptions = JSON.parse(dataString);
            this.calculatePitStops();
        }
    }

    resetOptions() {
        this.pitStopOptions = new PitstopOptions();
        this.optionsChanged();
    }
}