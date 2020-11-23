import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageNode} from "../page-node";
import {HttpClient} from "@angular/common/http";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";

@Component({
  selector: 'app-page-tree',
  templateUrl: './page-tree.component.html',
  styleUrls: ['./page-tree.component.scss']
})
export class PageTreeComponent implements OnInit {
  @Input()
  public selection: number;
  @Output()
  public onSelect: EventEmitter<any>;
  @Output()
  public onAdd: EventEmitter<any>;
  @Output()
  public onDelete: EventEmitter<any>;

  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;

    this.onSelect = new EventEmitter<any>();
    this.onAdd = new EventEmitter<any>();
    this.onDelete = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.reload();
  }

  public hasChild = (_: number, node: PageNode) => !!node.children && node.children.length > 0;

  public onSelectPage(id: number) {
    this.onSelect.emit(id);
    this.selection = id;
  }

  public onAddPage(id: number|null = null) {
    this.onAdd.emit({
      parent: id
    });
  }

  public onDeletePage(id: number) {
    this.onDelete.emit(id);
    this.reload();
  }

  public select(id) {
      this.selection = id;
  }

  public reload() {
    this.http.get('http://localhost:80/pagemodule/tree').subscribe((pages: any) => {
      this.dataSource.data = pages;
    });
  }
}
