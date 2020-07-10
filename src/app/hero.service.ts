import {Injectable} from '@angular/core';
import {Hero} from './hero.model';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = `${environment.baseUrl}/heroes`;

  constructor(private messageService: MessageService,
              private http: HttpClient) {
  }

  private httpOptions = {
    headers: new HttpHeaders(
      {'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')}),
  };

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl, this.httpOptions)
      .pipe(tap(() => this.log('obtida lista de heróis')),
        catchError(this.handleError<Hero[]>('getHeroes', [])))
      ;
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`, this.httpOptions).pipe(
      tap(() => this.log(`obtido Hero id=${id}`)),
      catchError(this.handleError<Hero>('getHero'))
    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.put<Hero>(url, hero, this.httpOptions)
      .pipe(tap(() => this.log(`atualizado Hero id=${hero.id}.`)),
        catchError(this.handleError<Hero>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(tap((newHero) => this.log(`adicionado hero id=${newHero.id}.`)),
        catchError(this.handleError<Hero>('updateHero'))
      );
  }

  deleteHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(tap(() => this.log(`apagado Hero id=${hero.id}.`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  // GET /heroes?name=term
  searchHeroes(term: string): Observable<Hero[]> {
    if (term && !term.trim()){
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`, this.httpOptions)
      .pipe(
      tap((heroes) => {
        if (heroes && heroes.length) {
          this.log(`encontrado ${heroes.length} heróis com name=${term}`);
        } else {
          this.log(`não encontrado heróis com name=${term}`);
        }
      }),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // logar no console o erro
      console.log(error);
      // logar no message qual o erro
      this.log(`${operation} failed: ${error.message}`);
      // retornar um objeto do mesmo tipo de onde veio o erro
      return of(result as T);
    };
  }

  private log(message) {
    this.messageService.add(`HeroService: ${message}.`);
  }

}
