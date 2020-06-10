import {Component, Input, OnInit} from '@angular/core';
import {Linkedin} from '../../model/linkedin';

@Component({
  selector: 'app-linkedin',
  templateUrl: './linkedin.component.html',
  styleUrls: ['./linkedin.component.css']
})
export class LinkedinComponent implements OnInit {
  @Input() linkedin: Linkedin;
  constructor() { }

  ngOnInit(): void {
  }

}
