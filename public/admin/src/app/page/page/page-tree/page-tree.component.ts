import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageNode} from "../page-node";

@Component({
  selector: 'app-page-tree',
  templateUrl: './page-tree.component.html',
  styleUrls: ['./page-tree.component.scss']
})
export class PageTreeComponent implements OnInit {
  @Input()
  public data: PageNode[];

  public selection: number;

  @Output()
  public onSelect: EventEmitter<any>;

  @Output()
  public onAdd: EventEmitter<any>;

  @Output()
  public onDelete: EventEmitter<any>;

  constructor() {
    this.onSelect = new EventEmitter<any>();
    this.onAdd = new EventEmitter<any>();
    this.onDelete = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }

  public hasChild = (_: number, node: PageNode) => !!node.children && node.children.length > 0;

  public onSelectPage(id: number) {
    this.onSelect.emit(id);
    this.selection = id;
  }

  public onAddPage(id: any) {
    this.onAdd.emit({
      parent: id
    });
  }

  public onDeletePage(id: number) {
    this.onDelete.emit(id);
  }

  public select(id) {
      console.log('select id: '+ id);
      this.selection = id;
  }
}
