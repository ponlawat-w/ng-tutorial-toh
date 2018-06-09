import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.messageService.add('エラー発生：' + operation + ' (' + error.message + ')');

      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('http://127.0.0.1/heroes/get.php')
      .pipe(
        tap(() => { this.messageService.add('ヒーローズ一覧を取得'); }),
        catchError(this.handleError('ヒーローズ一覧を取得不可', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>('http://127.0.0.1/heroes/get.php?id=' + id)
      .pipe(
        tap(hero => { this.messageService.add(hero.id + '番の「' + hero.name + '」の情報を取得完了。'); }),
        catchError(this.handleError<Hero>(id + '番のヒーローの情報を取得不可'))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put<any>('http://127.0.0.1/heroes/update.php', hero, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap(() => { this.messageService.add(hero.id + '番の「' + hero.name + '」を保存完了。'); }),
      catchError(this.handleError<any>('「' + hero.name + '」を保存不可。'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>('http://127.0.0.1/heroes/add.php', hero, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap((newHero: Hero) => { this.messageService.add('「' + newHero.name + '」が' + newHero.id + '番に追加されました。'); }),
      catchError(this.handleError<Hero>('ヒーロー新規不可。', null))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;

    return this.http.delete<any>('http://127.0.0.1/heroes/delete.php?id=' + id, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap(() => this.messageService.add(id + '番のヒーローが削除されました。')),
      catchError(this.handleError('ヒーロー削除不可。', null))
    );
  }

  searchHeroes(keyword: string): Observable<Hero[]> {
    keyword = keyword.trim();
    if (!keyword) {
      return of([]);
    }

    return this.http.get<Hero[]>('http://127.0.0.1/heroes/search.php?name=' + keyword).pipe(
      tap(() => this.messageService.add('「' + keyword + '」というヒーローを検索')),
      catchError(this.handleError<Hero[]>('ヒーロー検索不可', []))
    );
  }
}
