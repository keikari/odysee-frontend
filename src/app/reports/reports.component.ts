import {Component, OnInit} from '@angular/core';
import {Report} from './model/report'
import {User} from "../scams/user-detail/model/user/user";
import {ApiService} from "../services/api.service";
import {HttpParams} from "@angular/common/http";
import {MessageService} from "primeng";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];
  loading: false;
  itemsToReturnFilter: number;
  isActionTakenFilter: any; // null or boolean
  reportedByFilter: number;
  reportColumns = [];
  isReviewing: boolean;
  currentlyReviewing: Report;
  review: Report;
  constructor(public rest: ApiService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.changeColumns(null)
  }

  loadReports() {
    this.reports = [];
    let params = new HttpParams();
    if (this.isActionTakenFilter!=null) {
     params = params.set('is_action_taken',this.isActionTakenFilter)
    }
    if (this.reportedByFilter) {
      params = params.set('reported_by',this.reportedByFilter.toString())
    }
    if (this.itemsToReturnFilter) {
      params = params.set('limit',this.itemsToReturnFilter.toString())
    }
    this.rest.get('administrative', 'list_reports_requires_review', params).subscribe((reportResponse) => {
      if (reportResponse && reportResponse.error) {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'Error', detail: reportResponse.error});
      } else if (reportResponse && reportResponse.success) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Changed', detail: 'Review Submitted'});
        reportResponse.data.forEach((r) => {
          const report = new Report(r);
          this.reports.push(report);
        });
      } else {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'No Response Data?', detail: ''});
      }
      this.loading = false;
    })
  }

  changeColumns(reviewed) {
    let baseColumns = [
      {field: 'ID', header: 'ID'},
      {field: 'ReportedByID', header: 'ReportedByID'},
      {field: 'Email', header: 'Email'},
      {field: 'URI', header: 'URI'},
      {field: 'TagName', header: 'TagName'},
      {field: 'ReporterComment', header: 'ReporterComment'},
    ]
    if (reviewed!=null) {
      let additionalColumns = [
        {field: 'IsActionTaken', header: 'IsActionTaken'},
        {field: 'ReviewedById', header: 'ReviewedById'},
        {field: 'ReviewerComment', header: 'ReviewerComment'},
      ]
      this.reportColumns = baseColumns.concat(additionalColumns)
    } else {
      this.reportColumns = baseColumns;
    }
  }
  reviewReport(report) {
    this.isReviewing = true;
    this.review = report;
  }

  confirmReview(isConfirmed) {
    let params = new HttpParams().set('report_id', this.review.ID.toString()).set('is_action_taken', isConfirmed).set('comment', this.review.ReviewerComment)
    this.rest.post('administrative', 'review_report', params).subscribe((response) => {
      if (response && response.error) {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'Error', detail: response.error});
      } else if (response && response.success) {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Changed', detail: 'Reports Loaded'});
        this.removeReport(this.review);
      } else {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'No Response Data?', detail: ''});
      }
    })
    this.isReviewing=false;
  }

  removeReport(report: Report) {
    const newReports = [];
    this.reports.forEach((r) => {
      if (r.ID !== report.ID) {
        newReports.push(r);
      }
    });
    this.reports = newReports;
  }
}


