import { Injectable } from "@angular/core";
import { FuelCalculation } from './FuelCalculation';
import { Subject, race } from 'rxjs';
import { round } from '../utils/numberUtils';

export class StintOptions {
    distributeEvenly: boolean;
    minNumberOfPitstops: number;
}

export class Stint {
    fuel: number;
    fuelRemaining: number;
    laps: number;
    duration: number;

    constructor(fuel: number, laps: number, duration: number, remainingFuel: number) {
        this.fuel = fuel;
        this.laps = laps;
        this.duration = duration;
        this.fuelRemaining = remainingFuel;
    }
}

@Injectable()
export class StintCalculation {
    pitStops: Array<Stint> = [];
    calculationChange: Subject<void> = new Subject<void>();

    generateStints(fuelCalculation: FuelCalculation, options: StintOptions) {
        
        const requiredFuel = fuelCalculation.getRequiredFuel();
        const maxFuelCapacity = fuelCalculation.fuelTankCapacity;
        const fuelPerLap = fuelCalculation.fuelPerLap;
        const averageLapTime = fuelCalculation.averageLapTime;

        this.pitStops = [];
        if(fuelCalculation.getNumberOfPitstops() > 5) {
            return;
        }

        const minNumberOfPitstops = options.minNumberOfPitstops || 0;
        const numberOfPitstops = Math.max(minNumberOfPitstops, fuelCalculation.getNumberOfPitstops());

        let stillRequiredFuel = requiredFuel;
        let remainingFuel = 0;

        for(let i = 0; i <= numberOfPitstops ; i++) {
            let refuelAmount = stillRequiredFuel > maxFuelCapacity ? maxFuelCapacity : stillRequiredFuel;
            if(options.distributeEvenly) {
                refuelAmount = requiredFuel / (numberOfPitstops + 1);
            }
            let usableAmount = (this.pitStops.length === 0 && fuelCalculation.withFormationLap) ? refuelAmount - fuelPerLap : refuelAmount;
            usableAmount += remainingFuel;
            const enoughForLaps = Math.floor(usableAmount / fuelPerLap);
            const stintDuration = enoughForLaps * averageLapTime;
            remainingFuel = usableAmount - (enoughForLaps * fuelPerLap);

            this.pitStops.push(new Stint(round(refuelAmount, 1), enoughForLaps, stintDuration, round(remainingFuel, 1)));

            stillRequiredFuel -= refuelAmount;
        }

        this.calculationChange.next();
    }
}