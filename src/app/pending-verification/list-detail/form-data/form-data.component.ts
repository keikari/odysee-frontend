import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../model/user';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.css']
})
export class FormDataComponent implements OnInit {
  @Input() user = new User();
  constructor() { }

  ngOnInit(): void {
  }

}
