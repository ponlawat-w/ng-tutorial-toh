import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('ヒーローサービス：ヒーローズ取得完了。');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    const hero: Hero = HEROES.find((obj) => obj.id === id);

    if (hero) {
      this.messageService.add('ヒーローサービス：' + hero.id + '番の「' + hero.name + '」の情報を取得');
    } else {
      this.messageService.add('ヒーローサービス：' + id + '番のヒーローが見つかりません。');
    }

    return of(hero);
  }
}
