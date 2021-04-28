import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LazyLoadService {

  constructor(public rest: ApiService) {
  }

  getTags(userID: bigint): Observable<any> {
    let params = new HttpParams().set("user_id", userID.toString())
    return this.rest.get('administrative', 'user_tags', params);
  }
  getDuplicates(userID: bigint): Observable<any> {
    let params = new HttpParams().set("user_id", userID.toString())
    return this.rest.get('administrative', 'duplicates', params);
  }
  getRewards(userID: bigint): Observable<any> {
    let params = new HttpParams().set("user_id", userID.toString())
    return this.rest.get('administrative', 'redeemed_rewards', params);
  }
  getInvitedUsers(userID: bigint): Observable<any> {
    let params = new HttpParams().set("user_id", userID.toString())
    return this.rest.get('administrative', 'invited_users', params);
  }
  getFollowxFollow(userID: bigint): Observable<any> {
    let params = new HttpParams().set("user_id", userID.toString())
    return this.rest.get('administrative', 'f4f', params);
  }
  getViews(userID: bigint): Observable<any> {
    let params = new HttpParams().set("user_id", userID.toString())
    return this.rest.get('administrative', 'file_views', params);
  }
}

