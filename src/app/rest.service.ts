import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private messageService: MessageService ) { }

    endpoint = environment.apiurl;
    token: string;

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  private handleError<T> (operation = 'operation', result?: T) {
    const messageService = this.messageService;
    return (responseError: any): Observable<T> => {
      messageService.add({severity: 'error', summary: 'Error', detail: responseError.error.error});
      // TODO: send the error to remote logging infrastructure
      console.log(responseError); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  get(resource: string, action: string, params: HttpParams): Observable<any> {
    params = params.set('auth_token', this.token);
    const url = this.endpoint + '/' + resource + '/' + action;
    return this.http.get(url, {headers: null, params: params}).pipe(
      map(this.extractData), catchError(this.handleError<any>(resource + '/' + action))
    );
  }

  authenticate(token: string): Observable<any> {
    this.token = token;
    return this.get('user', 'me',  new HttpParams());
  }
}


