import {Component, Input, OnInit} from '@angular/core';
import {Twitter} from '../../model/twitter';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {
  @Input() twitter: Twitter;
  constructor() { }

  ngOnInit(): void {
  }

}
