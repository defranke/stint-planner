import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FuelCalculation {

    raceDuration: number;
    averageLapTime: number;
    fuelPerLap: number;
    fuelTankCapacity: number;

    calculationChange: Subject<void> = new Subject<void>();

    calculate(raceDuration: number, averageLapTime: number, fuelPerLap: number, fuelTankCapacity: number) {
        this.raceDuration = raceDuration;
        this.averageLapTime = averageLapTime;
        this.fuelPerLap = fuelPerLap;
        this.fuelTankCapacity = fuelTankCapacity;
        this.calculationChange.next();
    }

    getTotalLaps(): number {
        return Math.ceil(this.raceDuration / this.averageLapTime);
    }

    getRequiredFuel(): number {
        return (this.raceDuration / this.averageLapTime) * this.fuelPerLap;
    }

    getNumberOfPitstops(): number {
        return Math.floor(this.getRequiredFuel() / this.fuelTankCapacity);
    }
}