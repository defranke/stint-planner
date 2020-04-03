import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
    name: 'NaNPrinter'
})
export class NaNPrinterPipe implements PipeTransform {

    transform(value: number, label: string = "-") {
        if(value === undefined || isNaN(value)) {
            return label;
        }
        return value;
    }

}