import { Component, OnInit } from '@angular/core';
import { HeroService } from './../hero.service';
import { MessageService } from './../message.service';

import { Hero } from './../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  selectedHero: Hero;

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }

  onSelect(hero: Hero): void {
    this.messageService.add('ヒーローサービス：「' + hero.name + '」を選択。');
    this.selectedHero = hero;
  }

}
