import { Component, OnInit } from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ApiService} from '../services/api.service';
import {RetentionOptions} from './model/retention-options';
import {Retention} from './model/rentention';

@Component({
  selector: 'app-retention',
  templateUrl: './retention.component.html',
  styleUrls: ['./retention.component.css']
})
export class RetentionComponent implements OnInit {

  constructor(public rest: ApiService) { }

  retentionOptions: RetentionOptions;
  retentionData: Retention[];
  selectedInterval: any;
  selectedTag: any;

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions() {
    const newOptions = new RetentionOptions();
    newOptions.intervals = [];
    newOptions.tags = [];
    const params = new HttpParams();
    this.rest.get('administrative', 'retention_options', params).subscribe((r) => {
      r.data.intervals.forEach((i) => {
        newOptions.intervals.push({ label : i, value : i});
      });
      r.data.tags.forEach((t) => {
        newOptions.tags.push({ label : t, value : t});
      });
      this.retentionOptions = newOptions;
    });
  }

  loadRetentionData() {
    const newRetentionData = [];
    let params = new HttpParams();
    console.log('interval: ', this.selectedInterval);
    console.log('tag:', this.selectedTag);
    params = params.set('interval', this.selectedInterval.value);
    params = params.set('tag', this.selectedTag.value);
    this.rest.get('administrative', 'retention', params).subscribe((r) => {
      console.log(r);
      r.data.forEach((d) => {
        console.log(d);
        const data = new Retention();
        data.cohort = d.cohort;
        data.data = d.data;
        newRetentionData.push(data);
      });
      this.retentionData = newRetentionData;
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
