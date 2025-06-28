import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { Pokemon, PokemonBase } from '../model/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) {}

  getPokemons(
    page: number,
    pageSize: number
  ): Observable<{ results: PokemonBase[]; count: number }> {
    const offset = (page - 1) * pageSize;

    const params = new HttpParams()
      .set('limit', pageSize)
      .set('offset', offset);

    return this.http
      .get<{ results: PokemonBase[]; count: number }>(
        `${this.baseUrl}/pokemon`,
        { params }
      )
      .pipe(
        map((response) => ({
          results: response.results,
          count: response.count,
        })),
        catchError(this.errorHandler.handleWithThrow.bind(this.errorHandler))
      );
  }

  getPokemonDetails(name: string): Observable<Pokemon> {
    return this.http
      .get<Pokemon>(`${this.baseUrl}/pokemon/${name}`)
      .pipe(
        catchError(this.errorHandler.handleWithThrow.bind(this.errorHandler))
      );
  }
}
