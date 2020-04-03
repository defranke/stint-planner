import { Component } from '@angular/core';
import { FuelCalculation } from 'src/app/services/FuelCalculation';
import { Subscription } from 'rxjs';
import { PitStopCalculation } from 'src/app/services/PitStopCalculation';

@Component({
    selector: 'result-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.css']
})
export class Summary {
    _subscription: Subscription;

    raceDuration: number = 0;
    totalLaps: number = 0;
    requiredFuel: number = 0;
    requiredFuelForFormationLap: number = 0;
    requiredFuelForLastStint: number = 0;
    numberOfPitstops: number = 0;

    constructor(private fuelCalculation: FuelCalculation) {
        this._subscription = fuelCalculation.calculationChange.subscribe((result) => {
            this.raceDuration = fuelCalculation.raceDuration;
            this.requiredFuel = fuelCalculation.getRequiredFuel();
            this.requiredFuelForFormationLap = fuelCalculation.getRequiredFuelForFormationLap();
            this.requiredFuelForLastStint = fuelCalculation.getRequiredFuelForLastStint();
            this.totalLaps = fuelCalculation.getTotalLaps();
            this.numberOfPitstops = fuelCalculation.getNumberOfPitstops();
        });
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}