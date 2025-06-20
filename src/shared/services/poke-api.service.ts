import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';

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
    page: number = 1,
    pageSize: number = 20
  ): Observable<{ results: { name: string; url: string }[]; count: number }> {
    const offset = (page - 1) * pageSize;

    const params = new HttpParams()
      .set('limit', pageSize)
      .set('offset', offset);

    return this.http.get<any>(this.baseUrl, { params }).pipe(
      map((response) => ({
        results: response.results,
        count: response.count,
      })),
      catchError(this.errorHandler.handleWithThrow.bind(this.errorHandler))
    );
  }
}
