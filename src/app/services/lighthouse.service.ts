import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LighthouseService {

  constructor(private http: HttpClient) { }

  search(query: string) {
    const params = new HttpParams().
    set('s', query).
    set('debug', 'true').
    set('source', 'true');
    return this.http.get('https://lighthouse.lbry.com/search', { params: params}).
      pipe( map((r: Response) => r));
  }
}
