import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdministrativeService {

  constructor(public rest: ApiService) {
  }
  getPendingYTChannels(params: HttpParams): Observable<any> {
    return this.rest.get('administrative', 'youtube_pending', params);
  }
}
