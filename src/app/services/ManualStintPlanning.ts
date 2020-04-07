import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { FuelCalculation } from './FuelCalculation';
import { round } from '../utils/numberUtils';

export class ManualStint {
    targetFuel: number = 0;
    targetLaps: number = 0;
    driver: number = 0;
    notes: string;

    requiredRefuel: number;
    fuelRemaining: number;
    duration: number;
}

export class ManuelFuelData {
    stints: Array<ManualStint> = [];
}

@Injectable()
export class ManualStintPlanning {
    data: ManuelFuelData = new ManuelFuelData();

    addStint() {
        this.data.stints.push(new ManualStint());
    }

    duplicateStint(index: number) {
        this.data.stints.push({...this.data.stints[index]});
    }

    removeStint(index: number) {
        this.data.stints.splice(index, 1);
    }

    autofillTargetFuel(stintIndex: number, fuelCalculation: FuelCalculation) {
        const fuelTarget = fuelCalculation.fuelPerLap * this.data.stints[stintIndex].targetLaps;
        this.data.stints[stintIndex].targetFuel = Math.min(fuelCalculation.fuelTankCapacity, round(fuelTarget, 2));
    }

    autofillTargetLaps(stintIndex: number, fuelCalculation: FuelCalculation) {
        const targetLaps = Math.floor(this.data.stints[stintIndex].targetFuel / fuelCalculation.fuelPerLap);
        this.data.stints[stintIndex].targetLaps = targetLaps;
    }

    updateCalculations(fuelCalculation: FuelCalculation) {
        let fuelRemaningFromLastStint = 0;
        this.data.stints.forEach((s, index) => {
            s.requiredRefuel = round(s.targetFuel - fuelRemaningFromLastStint, 2);
            s.fuelRemaining = round(s.targetFuel - s.targetLaps * fuelCalculation.fuelPerLap, 2);
            s.duration = s.targetLaps * fuelCalculation.averageLapTime;

            fuelRemaningFromLastStint = s.fuelRemaining;
        });

        this.save();
    }

    getTotalDuration(): number {
        return round(this.data.stints.map(s => s.duration).filter(s => !isNaN(s)).reduce((agg, cur) => agg + cur, 0), 2);
    }

    getTotalFuel(): number {
        return round(this.data.stints.map(s => s.requiredRefuel).filter(s => !isNaN(s)).reduce((agg, cur) => agg + cur, 0), 2);
    }

    getDriverStintTimes(): Map<number, number> {
        let driverStintTimes = new Map<number, number>();
        this.data.stints.forEach(s => {
            const value = driverStintTimes.get(s.driver) || 0;
            driverStintTimes.set(s.driver, value + s.duration);
        });
        console.log(driverStintTimes);
        return driverStintTimes;
    }

    save() {
        localStorage.setItem('manualFuelPlanning', JSON.stringify(this.data));
    }

    read() {
        const dataString = localStorage.getItem('manualFuelPlanning');
        if(dataString) {
            this.data = JSON.parse(dataString);
        }
    }

}