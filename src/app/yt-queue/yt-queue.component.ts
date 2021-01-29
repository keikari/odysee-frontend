import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ApiService} from '../services/api.service';
import {AdministrativeService} from '../services/administrative.service';
import {YtChannel} from './model/yt-channel.model';
import {YoutubeChannel} from '../scams/user-detail/model/youtube_channel/youtube-channel';
import {MessageService} from 'primeng/api';
import {Table} from 'primeng/table';

@Component({
  selector: 'app-yt-queue',
  templateUrl: './yt-queue.component.html',
  styleUrls: ['./yt-queue.component.css']
})
export class YtQueueComponent implements OnInit {
  @ViewChild('dt') table: Table;
  youtubeColumns = [
    {field: 'UserID', header: 'User ID'},
    {field: 'UserRewardEnabled', header: 'Rewards'},
    {field: 'Countries', header: 'Countries'},
    {field: 'YoutubeChannelName', header: 'YoutubeChannel'},
    {field: 'DesiredChannelName', header: 'Desired Channel Name'},
    {field: 'Status', header: 'Status'},
    {field: 'Subscribers', header: 'Subscribers'},
    {field: 'Videos', header: 'Videos'},
    {field: 'Views', header: 'Views'},
    {field: 'ShouldSync', header: 'ShouldSync', api_field: 'should_sync'},
    {field: 'Reviewed', header: 'Reviewed', api_field: 'reviewed'},
  ];
  statusToSearch: string;
  ytChannels: YtChannel[];
  selectedChannels: YtChannel[];
  loading = false;
  searchOptions: any[];
  includeApproved: any;
  includeSyncable: any;
  includeReviewed: any;
  itemsToReturn: number;
  look_back_days: number;

  constructor(public rest: ApiService, private admService: AdministrativeService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.searchOptions = [
      {label: 'Pending', value: 'pending'},
      {label: 'Abandoned', value: 'abandoned'},
      {label: 'Queued', value: 'queued'},
    ];
  }

  loadChannels() {
    this.ytChannels = [];
    let params = new HttpParams();
    if (this.statusToSearch) {
      params = params.set('status', this.statusToSearch);
    }
    if (this.itemsToReturn > 0) {
      params = params.set('items_to_return', this.itemsToReturn.toString());
    }
    if (this.look_back_days > 0) {
      params = params.set('look_back_days', this.look_back_days.toString());
    }
    if (this.includeReviewed != null) {
      params = params.set('include_reviewed', this.includeReviewed);
    }
    if (this.includeApproved != null) {
      params = params.set('include_approved', this.includeApproved);
    }
    if (this.includeSyncable != null) {
      params = params.set('ignore_non_syncable', this.includeSyncable);
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

  approveRewards(channel: YtChannel, event) {
    const params = new HttpParams().set('id', channel.UserID.toString())
      .set('is_reward_approved', event.checked ? 'yes' : 'no')
      .set('comment', 'YoutubeChannel Review')
      .set('notify', 'true');
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

  approveSelectedRewards() {
    this.selectedChannels.forEach(channel => {
      channel.UserRewardEnabled = true;
      this.approveRewards(channel, {checked: true});
    });
  }

  updateSelected(shouldSync: boolean) {
    if (shouldSync) {
      this.selectedChannels.forEach(channel => {
        this.approveChannel(channel);
      });
    } else {
      this.selectedChannels.forEach(channel => {
        this.rejectChannel(channel);
      });
    }
  }

  approveChannel(channel: YtChannel) {
    channel.ShouldSync = false;
    this.changeFieldStatus(channel, 'should_sync', {checked: false});
    channel.Reviewed = false;
    this.changeFieldStatus(channel, 'reviewed', {checked: false});
    setTimeout(() => {
      channel.ShouldSync = true;
      this.changeFieldStatus(channel, 'should_sync', {checked: true});
    }, 1000);
    setTimeout(() => {
      channel.Reviewed = true;
      this.changeFieldStatus(channel, 'reviewed', {checked: true});
    }, 2000);
  }

  rejectChannel(channel: YtChannel) {
    channel.ShouldSync = true;
    this.changeFieldStatus(channel, 'should_sync', {checked: true});
    channel.Reviewed = false;
    this.changeFieldStatus(channel, 'reviewed', {checked: false});
    setTimeout(() => {
      channel.ShouldSync = false;
      this.changeFieldStatus(channel, 'should_sync', {checked: false});
    }, 1000);
    setTimeout(() => {
      channel.Reviewed = true;
      this.changeFieldStatus(channel, 'reviewed', {checked: true});
    }, 2000);
  }

  onVideosChange(event) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const videos = parseInt(value, 10);
      if (!isNaN(videos)) {
        this.table.filter(videos, 'Videos', 'lte');
      }
    } else {
      this.table.filter(1000000, 'Videos', 'lte');
    }
  }
}
