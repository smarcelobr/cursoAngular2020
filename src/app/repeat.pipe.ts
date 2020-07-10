import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repeat'
})
export class RepeatPipe implements PipeTransform {

  transform(value: any, times: number): any {
    return value.repeat(times);
  }

}
