import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {MessageService} from 'primeng/api';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  version = '';
  commit = '';
  balance = '';
  upTime = '';
  responseTime = '';

  constructor(public rest: ApiService, private messageService: MessageService) { }

  ngOnInit() {
    this.getStatus();
  }

  private getStatus() {
    const params = new HttpParams();
    this.rest.getAction('status', params).subscribe((response: any) => {
      if (response !== undefined) {
        this.version = response.data.version;
        this.commit = response.data.commit_message;
        this.balance = response.data.balance;
        this.upTime = response.data.request_stats.uptime;
        this.responseTime = response.data.request_stats.average_response_time;
      }
    });
  }

  updateStats($event: any) {
    this.getStatus();
  }
}
