import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MessageService} from 'primeng/api';
import {TagService} from '../../services/tag.service'

@Component({
  selector: 'app-tagchannel',
  templateUrl: './tagchannel.component.html',
  styleUrls: ['./tagchannel.component.css']
})
export class TagchannelComponent implements OnInit {

  claim_id: string;
  tag = '';

  constructor(public rest: ApiService, private messageService: MessageService, private tagService: TagService) { }

  ngOnInit() {

  }

  tagChannel() {
    this.tagService.tagChannel(this.tag, this.claim_id).subscribe((response: any) => {
      if (response !== undefined) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Success', detail: JSON.stringify(response.data, null, 1)});
      }
    });
  }
}
