import { Component } from '@angular/core';
import { FuelCalculation } from 'src/app/services/FuelCalculation';
import { Subscription } from 'rxjs';

@Component({
    selector: 'summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.css']
})
export class Summary {
    _subscription: Subscription;

    raceDuration: number = 0;
    totalLaps: number = 0;
    requiredFuel: number = 0;
    numberOfPitstops: number = 0;

    constructor(fuelCalculation: FuelCalculation) {
        this._subscription = fuelCalculation.calculationChange.subscribe((result) => {
            this.raceDuration = fuelCalculation.raceDuration;
            this.requiredFuel = fuelCalculation.getRequiredFuel();
            this.totalLaps = fuelCalculation.getTotalLaps();
            this.numberOfPitstops = fuelCalculation.getNumberOfPitstops();
        });
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}