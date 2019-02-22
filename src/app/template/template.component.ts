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

  subject = '';
  template = '';
  tags: string[] = [];
  verifiedValue = 'yes';
  appValue = '';
  mailgunTag = '';
  confirmValue = '';
  showInplace = false;
  emails: string[] = [];

  ngOnInit() {
  }

  sendTemplate($event: any) {
    const params = new HttpParams().
    set('subject', this.subject).
    set('template', this.template).
    set('tags', this.tags.join(',')).
    set('mailgun_tag', this.mailgunTag).
    set('confirm', this.confirmValue).
    set('verified', this.verifiedValue).
    set('installed', this.appValue).
    set('test', this.showInplace.toString()).
    set('test_emails', this.emails.join(','));

    console.log('sendtemplate', params);
    this.rest.get('template', 'send', params).subscribe((response: any) => {
      if (response !== undefined) {
        this.messageService.clear()
        this.messageService.add({severity: 'success', summary: 'Success', detail: response.data});
      }
    });
  }

  testSelected(isSelected: boolean) {
    this.showInplace = isSelected;
  }
}
