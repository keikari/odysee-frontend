import { Component, Input, OnInit } from '@angular/core';
import {LbryInc} from '../../model/lbry-inc'

@Component({
  selector: 'app-lbry-inc',
  templateUrl: './lbry-inc.component.html',
  styleUrls: ['./lbry-inc.component.css']
})
export class LbryIncComponent implements OnInit {
  @Input() lbryInc: LbryInc;
  constructor() { }

  ngOnInit(): void {
  }

}