import { Component, OnInit } from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ApiService} from '../../services/api.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-taguser',
  templateUrl: './taguser.component.html',
  styleUrls: ['./taguser.component.css']
})
export class TaguserComponent implements OnInit {
  emails: string[] = [];
  tag = '';
  createUser: boolean;

  constructor(public rest: ApiService, private messageService: MessageService) { }

  ngOnInit() {
  }

  tagUser($event: any) {
    const params = new HttpParams().
    set('emails', this.emails.join(',')).
    set('tag', this.tag);

    this.rest.get('users', 'tag', params).subscribe((response: any) => {
      if (response !== undefined) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Success', detail: JSON.stringify(response.data, null, 1)});
      }
    });
  }
}
