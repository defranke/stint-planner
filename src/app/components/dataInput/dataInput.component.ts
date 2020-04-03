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
    numberOfLaps = 10;
    withFormationLap = true;

    raceDurationHour = 1;
    raceDurationMinute = 0;

    averageLaptimeMinute = 1;
    averageLaptimeSeconds = 0;

    fuelPerLap = 0;
    fuelTankCapacity = 120;

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
        const averageLapTime = this.averageLaptimeMinute * 60 + this.averageLaptimeSeconds;
        if(this.selectedType === RaceDistanceType.Laps) {
            this.fuelCalculation.calculateForLaps(this.numberOfLaps, this.withFormationLap, averageLapTime, this.fuelPerLap, this.fuelTankCapacity);
        } else {
            const raceDuration = (this.raceDurationHour * 60 + this.raceDurationMinute) * 60;
            this.fuelCalculation.calculateForTime(raceDuration, this.withFormationLap, averageLapTime, this.fuelPerLap, this.fuelTankCapacity);
        }
    }

}