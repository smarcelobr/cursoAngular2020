import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Hero} from '../hero.model';
import {HeroService} from '../hero.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  template: `
    <app-search-input label="Nome" (search)="onSearch($event)"></app-search-input>
    <ul class="list-group">
    <li class="list-group-item" *ngFor="let hero of heroes$ | async">
      <a routerLink="/heroes/{{ hero.id }}">
        {{ hero.name }}
      </a>
    </li>
    </ul>
  `
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.heroService.searchHeroes(term))
    );
  }

  onSearch(term: string) {
    this.searchTerms.next(term);
  }
}
