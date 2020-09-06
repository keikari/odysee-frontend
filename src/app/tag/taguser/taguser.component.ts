import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MessageService} from 'primeng/api';
import {TagService} from '../../services/tag.service'

@Component({
  selector: 'app-taguser',
  templateUrl: './taguser.component.html',
  styleUrls: ['./taguser.component.css']
})
export class TaguserComponent implements OnInit {
  emails: string[] = [];
  tag = '';
  createUser: boolean;

  constructor(public rest: ApiService, private messageService: MessageService, private tagService: TagService) { }

  ngOnInit() {
  }

  tagUser($event: any) {
    this.tagService.tagMultiple(this.emails, this.tag).subscribe((response: any) => {
      if (response !== undefined) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Success', detail: JSON.stringify(response.data, null, 1)});
      }
    });
  }
}