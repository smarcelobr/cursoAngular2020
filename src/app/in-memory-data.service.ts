import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Hero} from './hero.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() {
  }

  createDb() {
    const heroes: Hero[] = [
      {id: 1, name: 'Homen-Aranha', canFly: false},
      {id: 2, name: 'Huck', canFly: false},
      {id: 3, name: 'Super-Homem', canFly: true},
      {id: 4, name: 'Mulher Maravilha', canFly: false},
      {id: 5, name: 'Thor', canFly: true},
      {id: 6, name: 'Batman', canFly: false},
      {id: 7, name: 'Homem de Ferro', canFly: true}
    ];

    return {heroes};
  }

  genId(heroes: Hero[]): number {
    const heroIds = heroes.map(hero => hero.id);

    const maxId = Math.max(...heroIds);

    const nextId = heroes.length > 0 ? maxId + 1 : 1;

    return nextId;
  }
}
