import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTree, MatTreeNestedDataSource} from "@angular/material/tree";
import {HttpClient} from "@angular/common/http";
import {TreeNode} from "primeng";

interface PageNode extends TreeNode {
  id?: number;
  // name: string;
  // children?: PageNode[];
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  private http: HttpClient;
  public data: PageNode[] = [];

  constructor(http: HttpClient) {
    this.http = http;
  }

  public hasChild = (_: number, node: PageNode) => !!node.children && node.children.length > 0;
  public pageId: any;
  public selectedPage: PageNode;
  public addItem: PageNode =
    {
      "label": "",
      "selectable": false,
      "type": "add"
    };

  public ngOnInit(): void {
    // this.data = [
    //   {
    //     "label": "Documents",
    //     "id": 1,
    //     "children": [{
    //       "label": "Work",
    //       "children": [
    //         {
    //           "label": "Expenses.doc",
    //         },
    //         {
    //           "label": "Resume.doc",
    //         }]
    //     },
    //       {
    //         "label": "Home",
    //         "children": [
    //           {
    //             "label": "Invoices.txt"
    //           }
    //         ]
    //       }]
    //   },
    //   {
    //     "label": "Pictures",
    //     "children": [
    //       {"label": "barcelona.jpg"},
    //       {"label": "logo.jpg"},
    //       {"label": "primeui.png"}
    //     ]
    //   },
    //   {
    //     "label": "Movies",
    //     "children": [{
    //       "label": "Al Pacino",
    //       "children": [
    //         {"label": "Scarface"},
    //         {"label": "Serpico"}
    //       ]
    //     },
    //       {
    //         "label": "Robert De Niro",
    //         "children": [
    //           {
    //             "label": "Goodfellas",
    //           },
    //           {
    //             "label": "Untouchables",
    //           }]
    //       }]
    //   },
    //   this.addItem
    // ];

    this.http.get('http://localhost:80/module/pagemodule/list  ').subscribe((pages: any) => {
      pages.push(this.addItem);
      this.data = pages;
    });
  }

  public onSelectPage(id: number) {
    this.pageId = id;
  }

  public onAddPage(node?: PageNode) {
    let body: any = {
      name: 'Neue Seite'
    };
    if (node) {
      body['parent'] = node.id;
    }
    this.http.post('http://localhost/module/pagemodule/create', body).subscribe((response) => {

    });
    let page: PageNode = {
      label: 'Neue Seite',
      children: []
    };

    if (node) {
      if (!Array.isArray(node.children)) {
        node.children = [];
      }

      node.children.push(page);
    } else {
      this.data.pop();
      this.data.push(page);
      this.data.push(this.addItem);
    }

    setTimeout(() => {
      node.expanded = true;
      this.selectedPage = page;
    }, 100);
  }

  public onDeletePage(node) {
    this.http.delete('http://localhost/module/pagemodule/'+node.id+'/delete').subscribe(() => {

    });

    let parent: TreeNode[];
    let add = null;
    if (node.parent === undefined) {
      parent = this.data;
      add = parent.pop();
    } else {
      parent = node.parent.children;
    }

    node.children.forEach((child) => {
      parent.push(child);
    });

    if (add) {
      parent.push(add);
    }
    parent.splice(parent.indexOf(node), 1);
  }

  public onShowNew(node) {

  }

  public onHideNew(node) {

  }

  public onMoveTop(node) {
    let list: PageNode[];
    if (node.parent === undefined) {
      list = this.data;
    } else {
      list = node.parent.children;
    }

    let i = list.indexOf(node);
    let tmp = list[i];
    list[i] = list[i - 1];
    list[i - 1] = tmp;
  }

  public onMoveDown(node) {
    let list: PageNode[];
    if (node.parent === undefined) {
      list = this.data;
    } else {
      list = node.parent.children;
    }

    let i = list.indexOf(node);
    let tmp = list[i];
    list[i] = list[i + 1];
    list[i + 1] = tmp;
  }
}
