import { Component } from '@angular/core';
import { SegmentedControlOption } from '../segmentedControl/segmentedControl.component';

enum StintMode {
    Automatic,
    Manual
}

@Component({
    selector: 'stints',
    templateUrl: './stints.component.html',
    styleUrls: ['./stints.component.css']
})
export class Stints {
    modes = StintMode;
    stintMode = [
        new SegmentedControlOption('automatic', 'Automatic', StintMode.Automatic),
        new SegmentedControlOption('manual', 'Manual', StintMode.Manual),
    ];
    selectedStintMode: StintMode = StintMode.Automatic;


    ngOnInit() {
        this.readData();
    }

    readData() {
        const dataString = localStorage.getItem('stintSelectedMode');
        if (dataString) {
            this.selectedStintMode = JSON.parse(dataString).stintMode;
        }
    }

    saveData() {
        localStorage.setItem('stintSelectedMode', JSON.stringify({stintMode: this.selectedStintMode}));
    }
}