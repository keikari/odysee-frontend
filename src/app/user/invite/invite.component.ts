import { Component, OnInit } from '@angular/core';
import {RestService} from '../../rest.service';
import {MessageService} from 'primeng/api';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  email = '';
  notifyValue = 'yes';

  constructor(public rest: RestService, private messageService: MessageService) { }

  ngOnInit() {
  }

  inviteUser($event: any) {
    const params = new HttpParams().
    set('email', this.email).
    set('notify', this.notifyValue);

    this.rest.get('user', 'invite', params).subscribe((response: any) => {
      if (response !== undefined) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Success', detail: JSON.stringify(response.data, null, 1)});
      }
    });
  }
}
