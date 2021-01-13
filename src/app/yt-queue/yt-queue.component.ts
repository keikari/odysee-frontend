import {Component, OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ApiService} from '../services/api.service';
import {AdministrativeService} from '../services/administrative.service';
import {YtChannel} from './model/yt-channel.model';
import {YoutubeChannel} from '../scams/user-detail/model/youtube_channel/youtube-channel';
import {MenuItem, MessageService} from 'primeng/api';

@Component({
  selector: 'app-yt-queue',
  templateUrl: './yt-queue.component.html',
  styleUrls: ['./yt-queue.component.css']
})
export class YtQueueComponent implements OnInit {

  youtubeColumns = [
    {field: 'UserID', header: 'User ID'},
    {field: 'UserRewardEnabled', header: 'Rewards'},
    {field: 'YoutubeChannelID', header: 'YoutubeChannel'},
    {field: 'DesiredChannelName', header: 'Desired Channel Name'},
    {field: 'Subscribers', header: 'Subscribers'},
    {field: 'Videos', header: 'Videos'},
    {field: 'Views', header: 'Views'},
    {field: 'Redeemable', header: 'Redeemable', api_field: 'redeemable'},
    {field: 'ShouldSync', header: 'ShouldSync', api_field: 'should_sync'},
    {field: 'Reviewed', header: 'Reviewed', api_field: 'reviewed'},
  ];
  ytChannels = [];
  loading = false;
  ignoreNonRedeemable: any;
  ignoreNonSyncable: any;
  includeReviewed: any;

  constructor(public rest: ApiService, private admService: AdministrativeService, private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  loadChannels() {
    this.ytChannels = [];
    let params = new HttpParams();
    console.log(this.includeReviewed);
    if (this.includeReviewed != null) {
      params = params.set('include_reviewed', this.includeReviewed);
    }
    console.log(this.ignoreNonRedeemable);
    if (this.ignoreNonRedeemable != null) {
      params = params.set('ignore_non_redeemable', this.ignoreNonRedeemable);
    }
    console.log(this.ignoreNonSyncable);
    if (this.ignoreNonSyncable != null) {
      params = params.set('ignore_non_syncable', this.ignoreNonSyncable);
    }

    this.loading = true;
    this.admService.getPendingYTChannels(params).subscribe(userResponse => {
      this.loading = false;
      userResponse.data.forEach((yt) => {
        const channel = new YtChannel(yt);
        this.ytChannels.push(channel);
      });
    });
  }

  // param came from column.api_field
  changeFieldStatus(channel: YtChannel, param: string, event) {
    const params = new HttpParams().set('channel_id', channel.YoutubeChannelID.toString()).set(param, event.checked.toString());
    this.rest.get('yt', 'disapprove', params).subscribe(response => {
      if (response && response.error) {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
      } else if (response && response.data) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Changed', detail: 'Channel updated!'});
      } else {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'No Response Data?', detail: ''});
      }
    });
  }

  ApproveRewards(channel: YtChannel, event) {
    const params = new HttpParams().set('id', channel.UserID.toString())
      .set('is_reward_approved', event.checked ? 'yes' : 'no')
      .set('comment', 'YoutubeChannel Review');
    this.rest.get('user', 'approve', params).subscribe((response) => {
      if (response && response.error) {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
      } else if (response && response.data) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Changed', detail: 'Rewards Status updated!'});
      } else {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'No Response Data?', detail: ''});
      }
    });
  }
}
