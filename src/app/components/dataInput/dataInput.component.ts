import { Component, Inject } from '@angular/core';
import { FuelCalculation } from 'src/app/services/FuelCalculation';

enum RaceDistanceType {
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
    withParadeLap = true;

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

    setWithParadeLap(value: boolean) {
        this.withParadeLap = value;
        this.calculate();
    }

    calculate() {
        // TODO: validation
        // TODO: run automatically when field changes
        const averageLapTime = this.averageLaptimeMinute * 60 + this.averageLaptimeSeconds;
        let raceDuration = 0;
        if(this.selectedType === RaceDistanceType.Laps) {
            let lapCount = this.numberOfLaps;
            if(this.withParadeLap) {
                lapCount += 1;
            }
            raceDuration = lapCount * averageLapTime;
        } else {
            raceDuration = (this.raceDurationHour * 60 + this.raceDurationMinute) * 60 + averageLapTime;
        }
        this.fuelCalculation.calculate(raceDuration, averageLapTime, this.fuelPerLap, this.fuelTankCapacity);
    }

}