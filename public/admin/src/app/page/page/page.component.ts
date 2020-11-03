import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PageNode} from "../page-node";
import {PageTreeComponent} from "../page-tree/page-tree.component";
import {PageInterface} from "../page.interface";


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  private http: HttpClient;

  @ViewChild(PageTreeComponent)
  public treeComp;

  public tree: any;
  public page: any;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public ngOnInit(): void {
    this.refreshTree();
  }

  public onSelectPage(id: number) {
    this.http.get('http://localhost:80/module/pagemodule/page/' + id).subscribe((page: PageInterface) => {
      // console.log(page);
      if (page.content === undefined) {
        page.content = {
          type: 'default',
          content: {},
          properties: {}
        };
      }
      this.page = page;
    });
  }

  public onAddPage(parentNode?: number) {
    let body: any = {
      name: 'Neue Seite'
    };
    if (parentNode) {
      body['parent'] = parentNode;
    }
    this.http.post('http://localhost/module/pagemodule/page/create', body).subscribe((response: any) => {
      console.log(body);
      this.refreshTree(parentNode);
      this.treeComp.select(response.data.id);
      this.onSelectPage(response.data.id);
    });
  }

  public onDeletePage(id) {
    this.http.delete('http://localhost/module/pagemodule/page/' + id + '/delete').subscribe(() => {
      this.refreshTree();
    });
  }

  public onSavePage(page: PageInterface) {
    let test = Object.assign({}, this.page.content);
    this.page.content = test;
    if (this.page.parent) {
      this.page.parent = this.page.parent.id;
    }
    this.page.children = this.page.children.map((el) => {
      return el.id;
    });

    this.http.put('http://localhost/module/pagemodule/page/' + page.id + '/update', this.page).subscribe(() => {
      console.log('saved');
    });
  }

  private refreshTree(id?: number) {
    let expanded = this.getExpanded();
    if (id) {
      expanded.push(id);
    }

    this.http.get('http://localhost:80/module/pagemodule/tree').subscribe((pages: any) => {
      this.tree = pages;
      this.expandAll(expanded);
    });
  }

  private expandAll(ids: number[]) {
    this.tree.forEach(node => {
      this.expandRecursive(node, ids);
    });
  }

  private expandRecursive(node: any, ids: number[]) {
    if (ids.find((id) => {
      return node.id === id
    })) {
      node.expanded = true;

      if (node.children) {
        node.children.forEach(childNode => {
          this.expandRecursive(childNode, ids);
        });
      }
    }
  }

  private getExpanded(): number[] {
    let ids = [];
    if (!this.tree) {
      return ids;
    }

    this.tree.forEach(node => {
      this.getExpandedRecurive(node, ids);
    });

    return ids;
  }

  private getExpandedRecurive(node: any, ids: number[]) {
    if (node.expanded) {
      ids.push(node.id);

      if (node.children) {
        node.children.forEach(childNode => {
          this.getExpandedRecurive(childNode, ids);
        });
      }
    }
  }
}
