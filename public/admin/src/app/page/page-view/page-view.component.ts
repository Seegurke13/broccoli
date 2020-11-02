import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PageInterface} from "../page.interface";
import {HttpClient} from "@angular/common/http";
import {EditorComponent} from "../../editor/editor/editor.component";

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

  @ViewChild(EditorComponent)
  public editor;

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.onSave = new EventEmitter<PageInterface>();
  }

  ngOnInit(): void {
  }

  public isFormFieldType(type: string) {
    return type === 'string' || type === 'number';
  }

  public isComponent(type: string): boolean {
    return customElements.get(type) !== undefined;
  }

  public save() {
    this.onSave.emit(this.page);
  }
}
