import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {RestService} from '../rest.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  constructor(public rest: RestService, private messageService: MessageService) { }

  subject: string;
  template: string;
  tags: string[];
  verifiedValue = 'yes';
  appValue = '';
  mailgunTags: string[];
  confirmValue = '';

  ngOnInit() {
  }

  sendTemplate($event: any) {
    const params = new HttpParams()
    params.set('subject', this.subject);
    params.set('template', this.template);
    params.set('tags', this.tags.join(','));
    params.set('mailgun_tag', this.mailgunTags.join(','));
    params.set('', '');
    params.set('', '');
    this.rest.get('template', 'send', new HttpParams()).subscribe((response: any) => {
      if (response !== undefined){
        this.messageService.add({severity: 'success', summary: 'Service Message', detail: response.data});
      }
    });

  }
}
