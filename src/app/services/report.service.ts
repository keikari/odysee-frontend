import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReportService extends RestService {
  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService);
    this.endpoint = environment.reportsurl;
    this.tokenParamName = 'key';
    this.token = '6juILzkpe8uj9PdsAnLa6PgSflH3DmXXSVQ3kJlA';
  }
}

