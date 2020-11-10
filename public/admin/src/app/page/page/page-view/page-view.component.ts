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
  public page: PageInterface;

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
