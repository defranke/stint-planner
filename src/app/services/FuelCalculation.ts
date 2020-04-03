import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { round } from '../utils/numberUtils';

@Injectable()
export class FuelCalculation {

    raceDuration: number;
    averageLapTime: number;
    fuelPerLap: number;
    fuelTankCapacity: number;
    withFormationLap: boolean;

    calculationChange: Subject<void> = new Subject<void>();

    calculateForLaps(numberOfLaps: number, withFormationLap: boolean, averageLapTime: number, fuelPerLap: number, fuelTankCapacity: number) {
        this.raceDuration = numberOfLaps * averageLapTime;
        this.averageLapTime = averageLapTime;
        this.fuelPerLap = fuelPerLap;
        this.fuelTankCapacity = fuelTankCapacity;
        this.withFormationLap = withFormationLap;
        this.calculationChange.next();
    }

    calculateForTime(raceDuration: number, withFormationLap: boolean, averageLapTime: number, fuelPerLap: number, fuelTankCapacity: number) {
        const calculatedLapCount = Math.ceil(raceDuration / averageLapTime);
        this.raceDuration = calculatedLapCount * averageLapTime;
        this.averageLapTime = averageLapTime;
        this.fuelPerLap = fuelPerLap;
        this.fuelTankCapacity = fuelTankCapacity;
        this.withFormationLap = withFormationLap;
        this.calculationChange.next();
    }

    getTotalLaps(): number {
        return Math.ceil(this.raceDuration / this.averageLapTime);
    }

    getRequiredFuelForRace(): number {
        return round((this.raceDuration / this.averageLapTime) * this.fuelPerLap, 1);
    }

    getRequiredFuelForFormationLap(): number {
        if(this.withFormationLap) {
            return this.fuelPerLap;
        }
        return 0;
    }

    getRequiredFuel(): number {
        return round(this.getRequiredFuelForRace() + this.getRequiredFuelForFormationLap(), 1);
    }

    getRequiredFuelForLastStint(): number {
        return round(this.getRequiredFuel() % (this.fuelTankCapacity - this.fuelPerLap), 1);
    }

    getNumberOfPitstops(): number {
        return Math.floor(this.getRequiredFuel() / (this.fuelTankCapacity - this.fuelPerLap));
    }
}