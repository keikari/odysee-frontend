import { Injectable } from '@angular/core';
import {RestService} from './rest.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerifyService extends RestService {
  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService);
    this.endpoint = environment.verifyurl;
    this.tokenParamName = 'auth';
    this.token = 'wM6Z3ySnO3ajhD-EeI0oAldDHcvm1w16';
  }
}
