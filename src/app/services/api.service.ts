import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {environment} from '../../environments/environment';
import {JSHttpParamEncoder} from '../util/jshttp-param-encoder';
import {RestService} from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends RestService {

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService);
    this.endpoint = environment.apiurl;
    this.tokenParamName = 'auth_token';
  }
}


