import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero.model';
import {HeroService} from '../hero.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  filter = '';

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe((heroes) => this.heroes = heroes);
  }

  onAdd(name: string) {
    const newHero: Hero = {name} as Hero;
    this.heroService.addHero(newHero).subscribe(hero => {
      if (hero) {
        this.heroes.push(hero);
      }
    });
  }

  delete(hero: Hero) {
    this.heroService.deleteHero(hero).subscribe(
      response => {
        if (typeof response !== 'undefined') {
          this.heroes = this.heroes.filter(h => h.id !== hero.id );
        }
      }
    );
  }

  onFilter(term: string) {
    this.filter = term;
  }
}
