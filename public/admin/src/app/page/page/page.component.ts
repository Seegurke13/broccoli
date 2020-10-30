import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PageNode} from "../page-node";


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  private http: HttpClient;

  public tree: any;
  public page: any;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public ngOnInit(): void {
    this.refreshTree();
  }

  public onSelectPage(page: PageNode) {
    this.http.get('http://localhost:80/module/pagemodule/page/'+page).subscribe((page) => {
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
    this.http.post('http://localhost/module/pagemodule/page/create', body).subscribe((response:any) => {
      this.refreshTree(response.data.id);
    });
  }

  public onDeletePage(id) {
    this.http.delete('http://localhost/module/pagemodule/page/'+id+'/delete').subscribe(() => {
      this.refreshTree();
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

  private expandAll(ids: number[]){
    this.tree.forEach( node => {
      this.expandRecursive(node, ids);
    });
  }

  private expandRecursive(node:any, ids: number[]){
    if (ids.find((id) => {return node.id === id})) {
      node.expanded = true;

      if (node.children){
        node.children.forEach( childNode => {
          this.expandRecursive(childNode, ids);
        } );
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

      if (node.children){
        node.children.forEach( childNode => {
          this.getExpandedRecurive(childNode, ids);
        } );
      }
    }
  }
}
