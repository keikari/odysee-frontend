import { Component, OnInit } from '@angular/core';
import {LighthouseService} from '../services/lighthouse.service';
import {SearchResult} from './model/search-result';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string;
  result: SearchResult;

  constructor(private lighthouse: LighthouseService) { }

  ngOnInit(): void {
  }

  runQuery(): void {
    this.lighthouse.search(this.query).subscribe(response => {
      console.log(response);
      this.result = new SearchResult(response);
      console.log(this.result);
    });
  }

}
