import { Component, OnInit } from '@angular/core';
import {RestService} from '../../rest.service';
import {MessageService} from 'primeng/api';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent implements OnInit {
  primary = '';
  secondary = '';

  constructor(public rest: RestService, private messageService: MessageService) { }

  ngOnInit() {
  }

  mergeUsers($event: any) {
    const params = new HttpParams().
    set('primary_user_id', this.primary).
    set('secondary_user_id', this.secondary);

    this.rest.get('user', 'merge', params).subscribe((response: any) => {
      if (response !== undefined) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Success', detail: JSON.stringify(response.data, null, 1)});
      }
    });
  }
}
