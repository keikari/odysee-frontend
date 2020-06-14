import {Component, Input, OnInit} from '@angular/core';
import {Facebook} from '../../model/facebook';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {
  @Input() facebook: Facebook;
  constructor() { }

  ngOnInit(): void {
  }

}
