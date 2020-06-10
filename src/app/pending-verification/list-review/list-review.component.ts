import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PendingUser} from '../pending-user';
import {TreeNode} from 'primeng';

@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.css']
})
export class ListReviewComponent implements OnInit {
  userCols = [{field: '', header: '', width: '30px'},
          {field: 'name', header: 'Name', width: '40px'},
          {field: 'email', header: 'Email', width: '60px'}];
  @Input() tree: TreeNode[];
  selectedNode: TreeNode;
  @Output() selectNode = new EventEmitter<TreeNode>();

  constructor() { }

  ngOnInit() {
    this.selectedNode = this.tree[0];
  }

  onSelectNode(event) {
    console.log('selected:', this.selectedNode);
    this.selectNode.emit(event.node);
  }
}
