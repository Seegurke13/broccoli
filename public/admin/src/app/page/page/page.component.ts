import {Component, OnInit, ViewChild} from '@angular/core';
import {PageTreeComponent} from "./page-tree/page-tree.component";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PageService} from "./page.service";
import {PageViewComponent} from "./page-view/page-view.component";


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  @ViewChild(PageViewComponent)
  public viewComp;
  @ViewChild(PageTreeComponent)
  public treeComp;

  public tree: any;
  public page: number;
  private route: ActivatedRoute;
  private snackBar: MatSnackBar;
  private pageService: PageService;

  constructor(route: ActivatedRoute, snackBar: MatSnackBar, pageService: PageService) {
    this.route = route;
    this.snackBar = snackBar;
    this.pageService = pageService;

    this.route.params.subscribe((params) => {
      if (params.id) {
        this.page = params.id;
      }
    });
  }

  public openSnackbar(msg: string) {
    this.snackBar.open(msg, null, {
      duration: 2000,
    });
  }

  public deletePage(id: number) {
    this.pageService.delete(id).subscribe(() => {
      this.openSnackbar('delete');
      this.treeComp.reload();
    });
  }

  public ngOnInit(): void {
  }

  // private refreshTree(id?: number) {
  //   let expanded = this.getExpanded();
  //   if (id) {
  //     expanded.push(id);
  //   }
  //
  //   // this.http.get('http://localhost:80/pagemodule/tree').subscribe((pages: any) => {
  //   //   this.tree = pages;
  //   //   this.expandAll(expanded);
  //   // });
  // }
  //
  // private expandAll(ids: number[]) {
  //   this.tree.forEach(node => {
  //     this.expandRecursive(node, ids);
  //   });
  // }
  //
  // private expandRecursive(node: any, ids: number[]) {
  //   if (ids.find((id) => {
  //     return node.id === id
  //   })) {
  //     node.expanded = true;
  //
  //     if (node.children) {
  //       node.children.forEach(childNode => {
  //         this.expandRecursive(childNode, ids);
  //       });
  //     }
  //   }
  // }
  //
  // private getExpanded(): number[] {
  //   let ids = [];
  //   if (!this.tree) {
  //     return ids;
  //   }
  //
  //   this.tree.forEach(node => {
  //     this.getExpandedRecurive(node, ids);
  //   });
  //
  //   return ids;
  // }
  //
  // private getExpandedRecurive(node: any, ids: number[]) {
  //   if (node.expanded) {
  //     ids.push(node.id);
  //
  //     if (node.children) {
  //       node.children.forEach(childNode => {
  //         this.getExpandedRecurive(childNode, ids);
  //       });
  //     }
  //   }
  // }
}
