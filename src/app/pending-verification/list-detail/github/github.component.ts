import {Component, Input, OnInit} from '@angular/core';
import {Github} from '../../model/github';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {
  @Input() github: Github;
  constructor() { }

  ngOnInit(): void {
  }

}
