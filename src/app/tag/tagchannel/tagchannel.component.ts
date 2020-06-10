import { Component, OnInit } from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ApiService} from '../../services/api.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-tagchannel',
  templateUrl: './tagchannel.component.html',
  styleUrls: ['./tagchannel.component.css']
})
export class TagchannelComponent implements OnInit {

  claim_id: string;
  tag = '';

  constructor(public rest: ApiService, private messageService: MessageService) { }

  ngOnInit() {

  }

  tagChannel() {
    const params = new HttpParams().
    set('tag', this.tag).
    set('claim_id', this.claim_id);

    this.rest.get('badge', 'new', params).subscribe((response: any) => {
      if (response !== undefined) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Success', detail: JSON.stringify(response.data, null, 1)});
      }
    });
  }
}
