import { Injectable } from "@angular/core";
import { FuelCalculation } from './FuelCalculation';
import { Subject } from 'rxjs';
import { round } from '../utils/numberUtils';

export class PitStop {
    fuel: number;
    laps: number;
    duration: number;

    constructor(fuel: number, laps: number, duration: number) {
        this.fuel = fuel;
        this.laps = laps;
        this.duration = duration;
    }
}

@Injectable()
export class PitStopCalculation {
    pitStops: Array<PitStop> = [];
    calculationChange: Subject<void> = new Subject<void>();

    generatePitstops(fuelCalculation: FuelCalculation) {

        let requiredFuel = fuelCalculation.getRequiredFuel();
        const maxFuelCapacity = fuelCalculation.fuelTankCapacity;
        const fuelPerLap = fuelCalculation.fuelPerLap;
        const averageLapTime = fuelCalculation.averageLapTime;

        this.pitStops = [];
        if(fuelCalculation.getNumberOfPitstops() > 5) {
            return;
        }
        while(requiredFuel > 0) {
            const refuelAmount = requiredFuel > maxFuelCapacity ? maxFuelCapacity : requiredFuel;
            const enoughForLaps = Math.floor(refuelAmount / fuelPerLap);
            const stintDuration = enoughForLaps * averageLapTime;

            this.pitStops.push(new PitStop(round(refuelAmount, 1), enoughForLaps, stintDuration));

            requiredFuel -= refuelAmount;
        }

        this.calculationChange.next();
    }
}