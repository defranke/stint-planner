import { Component, Inject } from '@angular/core';
import { FuelCalculation } from 'src/app/services/FuelCalculation';
import { SegmentedControlOption } from '../segmentedControl/segmentedControl.component';

export enum RaceDistanceType {
    Laps = 0,
    Time = 1
}

class Data {
    selectedType: RaceDistanceType = RaceDistanceType.Laps;
    numberOfLaps: number;
    withFormationLap = true;

    raceDurationHour: number;
    raceDurationMinute: number;

    averageLaptimeMinute: number;
    averageLaptimeSeconds: number;

    fuelPerLap: number;
    fuelTankCapacity: number;
}

@Component({
    selector: 'data-input',
    templateUrl: './dataInput.component.html',
    styleUrls: ['./dataInput.component.css'],
})
export class DataInput {
    public types = RaceDistanceType;
    public typeOptions = [
        new SegmentedControlOption('laps', 'Lap based', RaceDistanceType.Laps),
        new SegmentedControlOption('time', 'Time based', RaceDistanceType.Time),
    ];
    public withFormationLapOptions = [
        new SegmentedControlOption('withFormationLap', 'Yes', true),
        new SegmentedControlOption('noFormationLap', 'No', false),
    ]

    data: Data = new Data();

    constructor(private fuelCalculation: FuelCalculation) { }

    ngOnInit() {
        this.readData();
    }

    setRaceDistance(type: RaceDistanceType) {
        this.data.selectedType = type;
        this.calculate();
    }

    setWithFormationLap(value: boolean) {
        this.data.withFormationLap = value;
        this.calculate();
    }

    calculate() {
        const averageLapTime = (this.data.averageLaptimeMinute || 0) * 60 + (this.data.averageLaptimeSeconds || 0);
        if (this.data.selectedType === RaceDistanceType.Laps) {
            this.fuelCalculation.calculateForLaps(
                this.data.numberOfLaps,
                this.data.withFormationLap,
                averageLapTime,
                this.data.fuelPerLap || 0,
                this.data.fuelTankCapacity || 9999999);
        } else {
            const raceDuration = ((this.data.raceDurationHour || 0) * 60 + (this.data.raceDurationMinute || 0)) * 60;
            this.fuelCalculation.calculateForTime(
                raceDuration,
                this.data.withFormationLap,
                averageLapTime,
                this.data.fuelPerLap,
                this.data.fuelTankCapacity || 9999999);
        }

        this.saveData();
    }

    saveData() {
        localStorage.setItem('inputData', JSON.stringify(this.data));
    }

    readData() {
        const dataString = localStorage.getItem('inputData');
        if (dataString) {
            this.data = JSON.parse(dataString);
            this.calculate();
        }
    }

    reset() {
        this.data = new Data();
        this.calculate();
    }
}