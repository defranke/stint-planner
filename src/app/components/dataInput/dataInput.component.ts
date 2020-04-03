import { Component, Inject } from '@angular/core';
import { FuelCalculation } from 'src/app/services/FuelCalculation';

export enum RaceDistanceType {
    Laps = 0,
    Time = 1
}

@Component({
    selector: 'data-input',
    templateUrl: './dataInput.component.html',
    styleUrls: ['./dataInput.component.css'],
})
export class DataInput {
    public types = RaceDistanceType;

    selectedType = 0;
    numberOfLaps: number;
    withFormationLap = true;

    raceDurationHour: number;
    raceDurationMinute: number;

    averageLaptimeMinute: number;
    averageLaptimeSeconds: number;

    fuelPerLap: number;
    fuelTankCapacity: number;

    constructor(private fuelCalculation: FuelCalculation) {}

    ngOnInit() {
        this.calculate();
    }

    setRaceDistance(type: RaceDistanceType) {
        this.selectedType = type;
        this.calculate();
    }

    setWithFormationLap(value: boolean) {
        this.withFormationLap = value;
        this.calculate();
    }

    calculate() {
        // TODO: validation
        const averageLapTime = (this.averageLaptimeMinute || 0) * 60 + (this.averageLaptimeSeconds || 0);
        if(this.selectedType === RaceDistanceType.Laps) {
            this.fuelCalculation.calculateForLaps(
                this.numberOfLaps, 
                this.withFormationLap, 
                averageLapTime, 
                this.fuelPerLap || 0, 
                this.fuelTankCapacity || 9999999);
        } else {
            const raceDuration = ((this.raceDurationHour || 0) * 60 + (this.raceDurationMinute || 0)) * 60;
            this.fuelCalculation.calculateForTime(
                raceDuration, 
                this.withFormationLap, 
                averageLapTime, 
                this.fuelPerLap, 
                this.fuelTankCapacity || 9999999);
        }
    }

}