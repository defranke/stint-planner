import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Summary } from './components/summary/summary.component';
import { DataInput } from './components/dataInput/dataInput.component';
import { NumberStepper } from './components/numberStepper/numberStepper.component';
import { PrettyDurationPipe } from './components/pipes/prettyDuration.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DataInput,
    Summary,
    NumberStepper,
    PrettyDurationPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
