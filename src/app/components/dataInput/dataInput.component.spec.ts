import { TestBed, async } from '@angular/core/testing';
import { DataInput, RaceDistanceType } from './dataInput.component';
import { FuelCalculation } from 'src/app/services/FuelCalculation';

describe('DataInput', () => {
    const fuelCalculationMock = {
        calculateForLaps: jasmine.createSpy('calculateForLaps'),
        calculateForTime: jasmine.createSpy('calculateForTime')
    };

    beforeEach(async(() => {
        fuelCalculationMock.calculateForLaps.calls.reset();
        fuelCalculationMock.calculateForTime.calls.reset();

        TestBed.configureTestingModule({
            declarations: [
                DataInput
            ],
            providers: [
                { provide: FuelCalculation, useValue: fuelCalculationMock }
            ]
        }).compileComponents();
    }));

    it('call calculateForLaps for lap based races', () => {
        const fixture = TestBed.createComponent(DataInput);
        const comp = fixture.componentInstance;

        comp.selectedType = RaceDistanceType.Laps;
        comp.numberOfLaps = 90;
        comp.withFormationLap = false;
        comp.averageLaptimeMinute = 2;
        comp.averageLaptimeSeconds = 0;
        comp.fuelPerLap = 3.4;
        comp.fuelTankCapacity = 120;

        comp.calculate();

        expect(fuelCalculationMock.calculateForLaps).toHaveBeenCalledWith(90, false, 120, 3.4, 120);
    }); 

    it('call calculateForTime for time based races', () => {
        const fixture = TestBed.createComponent(DataInput);
        const comp = fixture.componentInstance;

        comp.selectedType = RaceDistanceType.Time;
        comp.raceDurationHour = 2;
        comp.raceDurationMinute = 2;
        comp.withFormationLap = false;
        comp.averageLaptimeMinute = 2;
        comp.averageLaptimeSeconds = 0;
        comp.fuelPerLap = 3.4;
        comp.fuelTankCapacity = 120;

        comp.calculate();

        expect(fuelCalculationMock.calculateForTime).toHaveBeenCalledWith(122 * 60, false, 120, 3.4, 120);
    }); 
});