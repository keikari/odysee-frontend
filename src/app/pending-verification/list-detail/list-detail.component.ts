import {Component, Input, OnInit} from '@angular/core';
import {User} from '../model/user';
import {PendingUser} from '../pending-user';
import {TreeNode} from 'primeng';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
  @Input() selectedUser: PendingUser = new PendingUser(null);
  constructor() { }

  ngOnInit() {
  }
}
