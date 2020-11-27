import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PageInterface} from "../page.interface";
import {HttpClient} from "@angular/common/http";
import {Editor2Component} from "../../../editor2/editor2/editor2.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {
  @Input()
  set pageId(id: number) {
    if (id) {
      this.http.get('http://localhost:80/pagemodule/page/' + id).subscribe((page: PageInterface) => {
        if (page.content.type === undefined) {
          page.content = {
            type: 'layout',
            settings: {}
          };
        }

        this.page = page;
      });
    }
  }

  public page: PageInterface;

  @Output()
  public onSave: EventEmitter<PageInterface>;

  @Output()
  public onDelete: EventEmitter<PageInterface>;

  @ViewChild(Editor2Component)
  public editor;

  private http: HttpClient;

  constructor(http: HttpClient, route: ActivatedRoute) {
    this.http = http;

    this.onSave = new EventEmitter<PageInterface>();
    this.onDelete = new EventEmitter<PageInterface>();
    route.params.subscribe((params) => {
      if (params.id === 'new') {
        this.create();
      } else {
        this.pageId = params.id;
      }
    });
  }

  ngOnInit(): void {
  }

  public save() {
    if (this.page.id) {
      this.http.put('http://localhost/pagemodule/page/' + this.page.id + '/update', this.page).subscribe(() => {
        this.onSave.emit(this.page);
      });
    } else {
      this.http.post('http://localhost/pagemodule/page/create', this.page).subscribe((page: any) => {
        this.page = page.data;
        this.onSave.emit(this.page);
      });
    }
  }

  public delete() {
    this.http.delete('http://localhost/pagemodule/page/' + this.page.id + '/delete').subscribe(() => {
      this.onDelete.emit(this.page);

      this.page = null;
    });
  }

  public create(parent: number| null = null) {
    this.page = {
      parent: parent,
      name: 'New Page',
      content: {
        type: 'template',
        settings: {}
      },
      route: 'new-page'
    }
  }

  public onNameChange($event: any) {
    let re = /\s/gi;
    this.page.route = $event.toLowerCase().replace(re, '-');
  }
}
