import { Component, OnInit } from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ApiService} from '../services/api.service';
import {RetentionOptions} from './model/retention-options';
import {Retention} from './model/rentention';
import {MessageService} from 'primeng';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-retention',
  templateUrl: './retention.component.html',
  styleUrls: ['./retention.component.css']
})
export class RetentionComponent implements OnInit {

  constructor(public rest: ApiService, private messageService: MessageService, private router: Router, private route: ActivatedRoute) { }

  retentionOptions: RetentionOptions;
  retentionData: Retention[];
  selectedInterval: { label: string, value: string };
  selectedTag: { label: string, value: string };
  loading: boolean;

  ngOnInit(): void {
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
      this.selectedInterval = initInterval;

      const queryTag = this.route.snapshot.queryParams['tag'];
      const initTag = this.retentionOptions.tags.map(t => t.value).includes(queryTag) ?
        {label: queryTag, value: queryTag} :
        this.retentionOptions.tags[0];
      this.selectedTag = initTag;
    });
  }

  loadRetentionData() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {interval: this.selectedInterval.value, tag: this.selectedTag.value},
        queryParamsHandling: 'merge'
      });

    const newRetentionData = [];
    let params = new HttpParams();
    params = params.set('interval', this.selectedInterval.value);
    params = params.set('tag', this.selectedTag.value);
    this.loading = true;
    this.rest.get('administrative', 'retention', params).subscribe((r) => {
      this.loading = false;
      if (!r) {
        return;
      } else if (r.error) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: r.error});
      } else if (!r.data) {
        this.messageService.add({severity: 'warn', summary: 'No data', detail: 'No retention data for this tag'});
      } else {
        r.data.forEach((d) => {
          const data = new Retention();
          data.cohort = d.cohort;
          data.data = d.data;
          newRetentionData.push(data);
        });
        this.retentionData = newRetentionData;
      }
    });
  }

  color(percent) {
    if (percent > 60) {
      return 'one';
    } else if (percent > 50) {
      return 'two';
    } else if (percent > 40) {
      return 'three';
    } else if (percent > 30) {
      return 'four';
    } else if (percent > 25) {
      return 'five';
    } else if (percent > 20) {
      return 'six';
    } else if (percent > 15) {
      return 'seven';
    } else if (percent > 10) {
      return 'eight';
    } else if (percent > 6) {
      return 'nine';
    } else if (percent > 3) {
      return 'ten';
    } else {
      return 'eleven';
    }
  }
}
