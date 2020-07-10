import { Pipe, PipeTransform } from '@angular/core';
import {Hero} from './hero.model';

@Pipe({
  name: 'heroFilter'
})
export class HeroFilterPipe implements PipeTransform {

  transform(heroes: Hero[], filter: string): Hero[] {
    const name = filter && filter.trim().toLocaleLowerCase();

    if (!name) {
      return heroes;
    } else {
      return heroes && heroes.filter(
        h => h.name.toLocaleLowerCase().indexOf(name) >= 0
      );
    }
  }

}
