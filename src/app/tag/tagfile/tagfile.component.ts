import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MessageService} from 'primeng/api';
import {TagService} from '../../services/tag.service'

@Component({
  selector: 'app-tagfile',
  templateUrl: './tagfile.component.html',
  styleUrls: ['./tagfile.component.css']
})
export class TagfileComponent implements OnInit {
  selectedTag: any;
  tagOptions: any[] = [];
  outpoint = '';
  claim_id = '';
  comment = '';

  constructor(public rest: ApiService, private messageService: MessageService, public tagService: TagService) {
  }

  ngOnInit() {
    this.tagService.getTags().subscribe(response => {
      if (response !== undefined) {
        response.data.forEach((tag) => {
          const tagName = tag.display_name ? tag.display_name : tag.name;
          this.tagOptions = this.tagOptions.concat({name: tagName, value: tag.name});
        });
        this.selectedTag = this.tagOptions[0];
      }
    });
  }
  
  tagFile() {
    this.tagService.tagFile(this.comment, this.outpoint, this.selectedTag.name, this.claim_id).subscribe((response: any) => {
      if (response !== undefined) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Success', detail: JSON.stringify(response.data, null, 1)});
      }
    });
  }


}
