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
  public page: PageInterface = {"id":67,"name":"Neue Seite","content":{"type":"layout","settings":{"type":"section","styles":[],"classes":["container","mt-2"],"children":[{"type":"layout","settings":{"styles":[],"classes":["row"],"children":[{"type":"layout","settings":{"styles":[],"classes":["col-lg-5"],"children":[{"type":"text","settings":{"text":"<h2>Hello World<\/h2>","classes":[]}}]}},{"type":"layout","settings":{"styles":[],"classes":["col-lg-7"],"children":[{"type":"image","settings":{"alt":"","src":"https:\/\/www.haustier-news.de\/wp-content\/uploads\/2017\/02\/Katzenbilder-30-Stueck.jpg","cClasses":["img-fluid","image-container"]}}]}}]}},{"type":"layout","settings":{"styles":[],"classes":["row","mt-5"],"children":[{"type":"layout","settings":{"styles":[],"classes":["col"],"children":[{"type":"html","settings":{"html":"<p>It works<\/p>","classes":[""]}}]}}]}}]}}};

  @Output()
  public onSave: EventEmitter<PageInterface>;

  @ViewChild(Editor2Component)
  public editor;

  private http: HttpClient;
  public preview: string = '';

  constructor(http: HttpClient) {
    this.http = http;
    this.onSave = new EventEmitter<PageInterface>();
  }

  ngOnInit(): void {
  }

  public save() {
    this.onSave.emit(this.page);
  }
}
