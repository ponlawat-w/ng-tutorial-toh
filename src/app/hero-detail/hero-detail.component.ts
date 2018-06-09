import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from './../hero';

import { HeroService } from './../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private heroService: HeroService
  ) { }

  ngOnInit() {
    const id: number = +this.route.snapshot.paramMap.get('id');

    this.heroService.getHero(id).subscribe(hero => {
      this.hero = hero;
    });
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => { this.location.back(); } );
  }

  delete(): void {
    if (!confirm(this.hero.name + 'を削除しますか？')) {
      return;
    }

    this.heroService.deleteHero(this.hero).subscribe(() => {
      this.router.navigate(['/heroes']);
    });
  }
}
