import {Component, OnInit} from '@angular/core';
import {Report} from './model/report';
import {ReportService} from '../services/report.service';
import {HttpParams} from '@angular/common/http';
import {MessageService} from 'primeng';
import {TagService} from '../services/tag.service';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];
  loading: false;
  itemsToReturnFilter: number;
  status: string;
  reportedByFilter: string;
  reportColumns = [];
  isReviewing: boolean;
  currentlyReviewing: Report;
  review: Report;
  Details: object;
  User: object;
  customTag: string;
  useCustomTag: boolean;
  tagOptions: any[] = [];
  selectedTag: any;
  userID: string;


  constructor(public rest: ReportService,
              private messageService: MessageService,
              private tagService: TagService,
              public apiRest: ApiService) {
  }

  ngOnInit(): void {
    this.changeColumns(null);
    this.tagService.getTags().subscribe(response => {
      if (response !== undefined) {
        response.data.forEach((tag) => {
          const tagName = tag.display_name ? tag.display_name : tag.name;
          this.tagOptions = this.tagOptions.concat({name: tagName, value: tag.name});
        });
        this.selectedTag = this.tagOptions[0];
      }
    });
    this.apiRest.get('user', 'me', new HttpParams()).subscribe((response) => {
        if (response && response.error) {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
        } else if (response && response.success) {
          this.userID = response.data.id;
        } else {
          this.messageService.clear();
          this.messageService.add({severity: 'error', summary: 'No Response Data?', detail: ''});
        }
      }
    );


  }

  loadReports() {
    this.reports = [];
    let params = new HttpParams().set('status', this.status);
    if (this.itemsToReturnFilter) {
      params = params.set('limit', this.itemsToReturnFilter.toString());
    } else {
      params = params.set('limit', '99999');
    }

    this.rest.getAction('list', params).subscribe((reportResponse) => {
      if (reportResponse && reportResponse.error) {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'Error', detail: reportResponse.error});
      } else if (reportResponse && reportResponse.success) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'OK', detail: 'Reports Loaded'});
        reportResponse.data.forEach((r) => {
          const report = new Report(r);
          this.reports.push(report);
        });
      } else {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'No Response Data?', detail: ''});
      }
      this.loading = false;
    });
  }

  changeColumns(reviewed) {
    const baseColumns = [
      {field: 'ReportID', header: 'ID'},
      {field: 'Type', header: 'Type'},
      {field: 'Category', header: 'Category'},
      {field: 'ClaimID', header: 'ClaimID'},
      {field: 'Status', header: 'Status'},
      {field: 'Email', header: 'Email'},
    ];
    if (reviewed != null) {
      const additionalColumns = [
        {field: 'IsActionTaken', header: 'IsActionTaken'},
        {field: 'ReviewedById', header: 'ReviewedById'},
        {field: 'ReviewerComment', header: 'ReviewerComment'},
      ];
      this.reportColumns = baseColumns.concat(additionalColumns);
    } else {
      this.reportColumns = baseColumns;
    }
  }

  reviewReport(report) {
    this.isReviewing = true;
    this.review = report;
    this.Details = JSON.parse(this.review.Details);
    this.User = report.User;
  }

  confirmReview(status) {
    const begining = this.userID + ' Report#' + this.review.ReportID;
    if (!this.review.ReviewerComment) {
      this.review.ReviewerComment = '';
    }
    this.review.ReviewerComment = begining + ' ' + this.review.ReviewerComment;
    let params = new HttpParams()
      .set('report_id', this.review.ReportID.toString())
      .set('comment', this.review.ReviewerComment).set('status', status);
    if (this.useCustomTag && this.selectedTag.name) {
      params = params.set('tag', this.selectedTag.value);
    }
    this.rest.getAction('review', params).subscribe((response) => {
      if (response && response.error) {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
      } else if (response && response.success) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'OK', detail: 'Review Submitted'});
        this.removeReport(this.review);
      } else {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'No Response Data?', detail: ''});
      }
    });
    this.isReviewing = false;
  }

  removeReport(report: Report) {
    const newReports = [];
    this.reports.forEach((r) => {
      if (r.ReportID !== report.ReportID) {
        newReports.push(r);
      }
    });
    this.reports = newReports;
  }
}


