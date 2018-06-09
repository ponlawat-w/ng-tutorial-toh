import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  private keywords = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search(keyword: string): void {
    this.keywords.next(keyword);
  }

  ngOnInit() {
    this.heroes$ = this.keywords.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((keyword: string) => this.heroService.searchHeroes(keyword))
    );
  }

}
