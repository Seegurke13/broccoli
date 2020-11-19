import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PageInterface} from "../page.interface";
import {HttpClient} from "@angular/common/http";
import {Editor2Component} from "../../../editor2/editor2/editor2.component";

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {
  @Input()
  set pageId(id: number) {
    this.http.get('http://localhost:80/pagemodule/page/' + id).subscribe((page: PageInterface) => {
      if (page.content.type === undefined) {
        page.content = {
          type: 'layout',
          settings: {}
        };
      }

      this.page = page;
      console.log(page);
    });
  }

  // public page: PageInterface = {"id":67,"name":"Neue Seite","content":{"type":"layout","settings":{"type":"section","styles":[],"classes":["container","mt-2"],"children":[{"type":"layout","settings":{"styles":[],"classes":["row"],"children":[{"type":"layout","settings":{"styles":[],"classes":["col-lg-5"],"children":[{"type":"text","settings":{"text":"<h2>Hello World<\/h2>","classes":[]}}]}},{"type":"layout","settings":{"styles":[],"classes":["col-lg-7"],"children":[{"type":"image","settings":{"alt":"","src":"https:\/\/www.haustier-news.de\/wp-content\/uploads\/2017\/02\/Katzenbilder-30-Stueck.jpg","cClasses":["img-fluid","image-container"]}}]}}]}},{"type":"layout","settings":{"styles":[],"classes":["row","mt-5"],"children":[{"type":"layout","settings":{"styles":[],"classes":["col"],"children":[{"type":"html","settings":{"html":"<p>It works<\/p>","classes":[""]}}]}}]}}]}}};
  public page: PageInterface;

  @Output()
  public onSave: EventEmitter<PageInterface>;

  @Output()
  public onDelete: EventEmitter<PageInterface>;

  @ViewChild(Editor2Component)
  public editor;

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;

    this.onSave = new EventEmitter<PageInterface>();
    this.onDelete = new EventEmitter<PageInterface>();
  }

  ngOnInit(): void {
  }

  public save() {
    if (this.page.id) {
      this.http.put('http://localhost/pagemodule/page/' + this.page.id + '/update', this.page).subscribe(() => {
        this.onSave.emit(this.page);
      });
    } else {
      this.http.post('http://localhost/pagemodule/page/create', this.page).subscribe((page: PageInterface) => {
        this.page = page;
        this.onSave.emit(this.page);
      });
    }
  }

  public delete() {
    this.http.delete('http://localhost/pagemodule/page/' + this.page + '/delete').subscribe(() => {
      this.onDelete.emit(this.page);
    });
  }

  public create(parent: number| null) {
    this.page = {
      parent: parent,
      name: 'New Page',
      content: {}
    }
  }
}
