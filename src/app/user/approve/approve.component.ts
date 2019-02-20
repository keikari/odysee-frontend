import { Component, OnInit } from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {RestService} from '../../rest.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {
  email = '';
  approvedValue = '';
  comment = '';

  constructor(public rest: RestService, private messageService: MessageService) { }

  ngOnInit() {
  }

  approveUser($event: any) {
    const params = new HttpParams().
    set('is_reward_approved', this.approvedValue).
    set('email', this.email).
    set('comment', this.comment);

    this.rest.get('user', 'approve', params).subscribe((response: any) => {
      if (response !== undefined) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Success', detail: JSON.stringify(response.data, null, 1)});
      }
    });
  }
}
