import { Component, OnInit } from '@angular/core';
import {RestService} from '../../rest.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  email = '';
  notifyValue = 'yes';

  constructor(public rest: RestService, private messageService: MessageService) { }

  ngOnInit() {
  }

}
