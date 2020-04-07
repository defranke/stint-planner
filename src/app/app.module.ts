import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Summary } from './components/summary/summary.component';
import { DataInput } from './components/dataInput/dataInput.component';
import { NumberStepper } from './components/numberStepper/numberStepper.component';
import { PrettyDurationPipe } from './pipes/prettyDuration.pipe';
import { FuelCalculation } from './services/FuelCalculation';
import { NaNPrinterPipe } from './pipes/naNPrinterPipe.pipe';
import { StintCalculation } from './services/StintCalculation';
import { SegmentedControl } from './components/segmentedControl/segmentedControl.component';
import { Stints } from './components/stints/stints.component';
import { StintsAutomatic } from './components/stintsAutomatic/stintsAutomatic.component';
import { StintsManual } from './components/stintsManual/stintsManual.component';
import { ManualStintPlanning } from './services/ManualStintPlanning';

@NgModule({
  declarations: [
    AppComponent,
    DataInput,
    Summary,
    Stints,
    StintsAutomatic,
    StintsManual,

    NumberStepper,
    SegmentedControl,

    PrettyDurationPipe,
    NaNPrinterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    FuelCalculation,
    StintCalculation,
    ManualStintPlanning
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
