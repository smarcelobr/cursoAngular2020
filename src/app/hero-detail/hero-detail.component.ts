import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../hero.model';
import {HeroService} from '../hero.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private heroService: HeroService) {

  }

  ngOnInit(): void {
//    console.log(this.route.snapshot);
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.heroService.updateHero(this.hero).subscribe();
  }
}
