import {Component, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ToolbarService} from "./toolbar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin';
  private router: Router;

  @ViewChild('toolbarEl')
  public toolbarEL;

  public toolbar: TemplateRef<any>;
  public toolbarOpen: boolean;

  constructor(router: Router, toolbarService: ToolbarService) {
    this.router = router;

    this.router.events.subscribe(() => {
      this.toolbar = null;
      this.toolbarOpen = false;
    });

    toolbarService.getObservable().subscribe((toolbar) => {
      if (!this.toolbar
        || toolbar !== undefined
        && toolbar.elementRef !== this.toolbar.elementRef
      ) {
        this.toolbarOpen = true;
        this.toolbarEL.open();
      }
      this.toolbar = toolbar;
    });
  }
}
