import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  tagOptions: any[] = [];
  
  constructor(public rest: ApiService) { }
  
  getTags(): Observable<any> {
    return this.rest.get('tag', 'list', new HttpParams());
  }
  tagFile(comment: string, outpoint:string, selectedTag:string, claim_id: string): Observable<any> {
    const params = new HttpParams().
      set('comment', comment).
      set('outpoint', outpoint).
      set('tag_name', selectedTag).
      set('claim_id', claim_id);
    return this.rest.get('tag', 'list', params);
  }

  tagUser(tag: string,id: string,status: boolean): Observable<any> {
    const params = new HttpParams().
      set(status ? 'remove' : 'add', tag).set('user_id', id);
    return this.rest.get('user_tag', 'edit', params)
  }

  tagMultiple(emails: string[], tag: string): Observable<any> {
    const params = new HttpParams().
      set('emails', emails.join(',')).
      set('tag', tag);
    return this.rest.get('users', 'tag', params)
  }

  tagChannel(tag: string, claim_id: string): Observable<any> {
    const params = new HttpParams().
      set('tag', tag).
      set('claim_id', claim_id);
    return this.rest.get('badge', 'new', params)
  }
}
