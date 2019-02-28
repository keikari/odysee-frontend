import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestService} from '../../rest.service';
import {MessageService} from 'primeng/api';
import {HttpParams} from '@angular/common/http';

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

  constructor(public rest: RestService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.rest.get('tag', 'list', new HttpParams() ).subscribe((response: any) => {
      if (response !== undefined) {
        response.data.forEach((tag) => {
          const tagName = tag.display_name ? tag.display_name : tag.name;
          console.log( tagName, tag.name);
          this.tagOptions = this.tagOptions.concat({name: tagName, value: tag.name});
        });
        console.log(this.tagOptions);
      }
    });
  }

  tagFile() {
    const params = new HttpParams().
    set('comment', this.comment).
    set('outpoint', this.outpoint).
    set('tag_name', this.selectedTag.name).
    set('claim_id', this.claim_id);

    this.rest.get('file', 'tag', params).subscribe((response: any) => {
      if (response !== undefined) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Success', detail: JSON.stringify(response.data, null, 1)});
      }
    });
  }


}
