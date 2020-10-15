import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {MessageService} from 'primeng/api';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-channel-factor',
  templateUrl: './channel-factor.component.html',
  styleUrls: ['./channel-factor.component.css']
})
export class ChannelFactorComponent implements OnInit {

  claimId: string = "";
  factor : number = 0.0;

  constructor(public rest: ApiService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  setFactor() {
    const params = new HttpParams().
      set('channel_claim_id', this.claimId).
      set('factor', this.factor.toString())

      this.rest.get('creator', 'set_factor', params).subscribe((response:any) => {
        if (response !== undefined) {
                this.messageService.clear();
                this.messageService.add({severity: 'success', summary: 'Success', detail: JSON.stringify(response.data, null, 1)});
        }
      });
  }
}