import { Component } from '@angular/core';
import { PitStopCalculation, PitStop } from 'src/app/services/PitStopCalculation';
import { Subscription } from 'rxjs';


@Component({
    selector: 'pit-stops',
    templateUrl: './pitstops.component.html',
    styleUrls: ['./pitstops.component.css']
})
export class PitStops {
    _subscription: Subscription;

    pitStops: Array<PitStop> = [];

    constructor(private pitStopCalculation: PitStopCalculation) {
        this._subscription = pitStopCalculation.calculationChange.subscribe(() => {
            this.pitStops = pitStopCalculation.pitStops;
        });
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}