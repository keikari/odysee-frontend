import { Component, OnInit } from '@angular/core';
import {PendingUser} from './pending-user';
import {MessageService, TreeNode} from 'primeng/api';
import {VerifyService} from '../services/verify.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-pending-verification',
  templateUrl: './pending-verification.component.html',
  styleUrls: ['./pending-verification.component.css']
})
export class PendingVerificationComponent implements OnInit {
  selectedNode: TreeNode = pendingUserToTreeNode(new PendingUser(null));
  tree: TreeNode[];
  constructor(public rest: VerifyService, private messageService: MessageService) { }

  ngOnInit() {
    this.loadTree();
  }

  setSelected(node: TreeNode) {
    this.selectedNode =  node;
  }

  loadTree() {
    this.tree = [];
    let params = new HttpParams();
    const d = new Date(Date.now());
    d.setHours(d.getHours() - 24);
    params = params.set( 'since', (Math.ceil(d.getTime() / 1000)).toString());
    this.rest.getAction( 'pending', params).subscribe((userResponse) => {
      userResponse.forEach((u) => {
        const pu = new PendingUser(u);
        this.tree = [...this.tree, {data: pu, children: pu.duplicates.map(pendingUserToTreeNode)}];
      });
    });
  }
}

function pendingUserToTreeNode(user: PendingUser): TreeNode {
  return {
    data: user,
    children: user.duplicates.map(pendingUserToTreeNode),
  };
}
