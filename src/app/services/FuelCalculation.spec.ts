import { FuelCalculation } from "./FuelCalculation";


describe('FuelCalculation', () => {

    let fuelCalculation: FuelCalculation;

    beforeEach(() => {
        fuelCalculation = new FuelCalculation();
    });

    it('correctly calculates race duration for lap based races', () => {
        const numberOfLaps = 4;
        const averageLaptime = 180;
        const fuelPerLap = 3;
        const fuelTankCapacity = 10;

        fuelCalculation.calculateForLaps(numberOfLaps, false, averageLaptime, fuelPerLap, fuelTankCapacity);

        expect(fuelCalculation.raceDuration).toEqual(12 * 60);
        expect(fuelCalculation.getRequiredFuel()).toEqual(12);
        expect(fuelCalculation.getTotalLaps()).toEqual(4);
        expect(fuelCalculation.getNumberOfPitstops()).toEqual(1);
    });

    it('correctly calculates race duration for lap based races with formation lap', () => {
        const numberOfLaps = 4;
        const averageLaptime = 180;
        const fuelPerLap = 3;
        const fuelTankCapacity = 10;

        fuelCalculation.calculateForLaps(numberOfLaps, true, averageLaptime, fuelPerLap, fuelTankCapacity);

        expect(fuelCalculation.raceDuration).toEqual(12 * 60);
        expect(fuelCalculation.getRequiredFuel()).toEqual(15);
        expect(fuelCalculation.getTotalLaps()).toEqual(4);
        expect(fuelCalculation.getNumberOfPitstops()).toEqual(1);
    });

    it('correctly calculates race duration for time based races', () => {
        const raceDuration = 10 * 60;
        const averageLaptime = 120;
        const fuelPerLap = 3;
        const fuelTankCapacity = 20;

        fuelCalculation.calculateForTime(raceDuration, false, averageLaptime, fuelPerLap, fuelTankCapacity);

        expect(fuelCalculation.raceDuration).toEqual(10 * 60);
        expect(fuelCalculation.getRequiredFuel()).toEqual(15);
        expect(fuelCalculation.getTotalLaps()).toEqual(5);
        expect(fuelCalculation.getNumberOfPitstops()).toEqual(0);
    });

    it('correctly calculates race duration for time based races with formation lap', () => {
        const raceDuration = 10 * 60;
        const averageLaptime = 120;
        const fuelPerLap = 3;
        const fuelTankCapacity = 17;

        fuelCalculation.calculateForTime(raceDuration, true, averageLaptime, fuelPerLap, fuelTankCapacity);

        expect(fuelCalculation.raceDuration).toEqual(10 * 60);
        expect(fuelCalculation.getRequiredFuel()).toEqual(18);
        expect(fuelCalculation.getTotalLaps()).toEqual(5);
        expect(fuelCalculation.getNumberOfPitstops()).toEqual(1);
    }); 

    it('correctly calculates race duration for time based races if you start you cross the line right before the time is up', () => {
        const raceDuration = 10 * 60;
        const averageLaptime = 3 * 60;
        const fuelPerLap = 3;
        const fuelTankCapacity = 5;

        fuelCalculation.calculateForTime(raceDuration, false, averageLaptime, fuelPerLap, fuelTankCapacity);

        expect(fuelCalculation.raceDuration).toEqual(12 * 60);
        expect(fuelCalculation.getRequiredFuel()).toEqual(12);
        expect(fuelCalculation.getTotalLaps()).toEqual(4);
        expect(fuelCalculation.getNumberOfPitstops()).toEqual(2);
    });
});