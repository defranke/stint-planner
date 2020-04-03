import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
    name: 'prettyDuration'
})
export class PrettyDurationPipe implements PipeTransform {

    transform(durationInSeconds: any): string {
        if(typeof durationInSeconds !== 'number') {
            return durationInSeconds;
        }
        const hours = Math.floor(durationInSeconds / 3600);
        let remainingSeconds = durationInSeconds - hours * 3600;
        let minutes = Math.floor(remainingSeconds / 60)
        remainingSeconds -= minutes * 60;

        let result = "";
        if(hours > 0) {
            result = `${hours}h `
        }
        if(minutes > 0 || hours > 0) {
            result += `${minutes}m `
        }
        result += `${remainingSeconds}s`

        return result;
    }
}