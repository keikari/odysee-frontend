import { Component, OnInit } from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ApiService} from '../services/api.service';
import {RetentionOptions} from './model/retention-options';
import {Retention} from './model/retention';
import {RetentionParams} from './model/retention-params';
import {MessageService, MultiSelectItem} from 'primeng';
import {Router, ActivatedRoute} from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-retention',
  templateUrl: './retention.component.html',
  styleUrls: ['./retention.component.css']
})

export class RetentionComponent implements OnInit {

  constructor(public rest: ApiService, private messageService: MessageService, private router: Router, private route: ActivatedRoute) { }

  retentionOptions: RetentionOptions;
  retentionData: Retention[];
  retentionDataColHeaders: number[];
  selected: RetentionParams;
  active: RetentionParams;
  loading: boolean;

  ngOnInit(): void {
    this.selected = new RetentionParams();
    let sinceDate = new Date();
    sinceDate.setMonth(sinceDate.getMonth() - 3);
    this.selected.since = sinceDate;
    this.active = new RetentionParams();
    this.loading = false;
    this.loadOptions();
  }

  loadOptions() {
    const newOptions = new RetentionOptions();
    newOptions.intervals = [];
    newOptions.tags = [];
    const params = new HttpParams();
    this.rest.get('administrative', 'retention_options', params).subscribe((r) => {
      r.data.intervals.forEach((i) => { newOptions.intervals.push({label: i, value: i}); });
      r.data.tags.forEach((t) => { newOptions.tags.push({label: t, value: t}); });
      this.retentionOptions = newOptions;

      const queryInterval = this.route.snapshot.queryParams['interval'];
      const initInterval = this.retentionOptions.intervals.map(i => i.value).includes(queryInterval) ?
        {label: queryInterval, value: queryInterval} :
        this.retentionOptions.intervals[0];
      this.selected.interval = initInterval;

      const queryTags = (this.route.snapshot.queryParams['tag'] || this.route.snapshot.queryParams['tags']).split(',');
      const initTags = this.retentionOptions.tags.map(t => t.value).filter(t => queryTags.includes(t));
      this.selected.tags = initTags.map(t => ({label: t, value: t}));

      const querySince = this.route.snapshot.queryParams['since'];
      if (querySince) {
        this.selected.since = new Date(querySince);
      }

      const queryIntervals = this.route.snapshot.queryParams['intervals'];
      if (queryIntervals) {
        this.selected.intervals = parseInt(queryIntervals, 10);
      }

      if (queryInterval && queryTags.length) {
        this.loadRetentionData();
      }
    });
  }

  loadRetentionData() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          tags: this.selected.tags.map(t => t.value).join(','),
          interval: this.selected.interval.value,
          since: this.selected.sinceStr(),
          intervals: this.selected.intervals,
        },
        queryParamsHandling: 'merge'
      });

    this.active.tags = this.selected.tags;
    this.active.interval = this.selected.interval;
    this.active.since = this.selected.since;
    this.active.intervals = this.selected.intervals;

    const newRetentionData = [];
    let params = new HttpParams()
      .set('interval', this.selected.interval.value)
      .set('tags', this.selected.tags.map(t => t.value).join(','));
    if (this.selected.since) {
      params = params.set('since', this.selected.sinceStr());
    }
    if (this.selected.intervals > 0) {
      params = params.set('intervals', this.selected.intervals.toString());
    }

    this.loading = true;
    this.rest.get('administrative', 'retention', params).subscribe((r) => {
      this.loading = false;
      if (!r) {
        return;
      } else if (r.error) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: r.error});
      } else if (!r.data) {
        this.messageService.add({severity: 'warn', summary: 'No data', detail: 'No retention data for these params'});
      } else {
        r.data.forEach((d) => {
          const data = new Retention();
          data.cohort = d.cohort;
          data.data = d.data;
          newRetentionData.push(data);
        });
        this.retentionData = newRetentionData;
        this.retentionDataColHeaders =
          [...Array(this.retentionData.map(i => i.data.length).reduce((acc, d) => Math.max(acc, d))).keys()].slice(1);
      }
    });
  }

  color(percent: number) {
    const maxBg = 9;
    const realisticMaxPercent = 70;
    const scaledPercent = Math.min(percent, realisticMaxPercent);
    return 'bg-' + (Math.round(scaledPercent / realisticMaxPercent * maxBg)).toString();
  }
}
