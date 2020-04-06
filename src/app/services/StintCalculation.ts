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
    refueling: number;
    fuelRemaining: number;
    laps: number;
    duration: number;

    constructor(refueling: number, fuel: number, laps: number, duration: number, remainingFuel: number) {
        this.refueling = refueling;
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
        // if(fuelCalculation.getNumberOfPitstops() > 5) {
        //     return;
        // }

        const minNumberOfPitstops = options.minNumberOfPitstops || 0;
        const numberOfPitstops = Math.max(minNumberOfPitstops, fuelCalculation.getNumberOfPitstops());

        let stillRequiredFuel = requiredFuel;
        let remainingFuel = 0;

        for(let i = 0; i <= numberOfPitstops ; i++) {
            let refuelAmount;
            if(options.distributeEvenly) {
                refuelAmount = Math.min(requiredFuel / (numberOfPitstops + 1), maxFuelCapacity - remainingFuel);
            }else if(i === 0) {
                refuelAmount = maxFuelCapacity;
            }else if(stillRequiredFuel > (maxFuelCapacity - remainingFuel)) {
                refuelAmount = maxFuelCapacity - remainingFuel;
            }else {
                refuelAmount = stillRequiredFuel;
            }
            let resultingFuel = refuelAmount + remainingFuel;

            if(this.pitStops.length === 0 && fuelCalculation.withFormationLap) {
                resultingFuel -= fuelPerLap; // subtract fuel for formation lap
            }
            let usableAmount = resultingFuel
            if(i < numberOfPitstops) {
                usableAmount -= fuelPerLap; // pit one lap before fuel is empty
            }
            

            const enoughForLaps = Math.floor(usableAmount / fuelPerLap);
            const stintDuration = enoughForLaps * averageLapTime;
            remainingFuel = resultingFuel - (enoughForLaps * fuelPerLap);

            this.pitStops.push(new Stint(round(refuelAmount, 1), round(resultingFuel, 1), enoughForLaps, stintDuration, round(remainingFuel, 1)));

            stillRequiredFuel -= refuelAmount;
        }

        this.calculationChange.next();
    }
}