import {Component, Input, OnInit} from '@angular/core';
import {PageInterface} from "../page.interface";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {
  @Input()
  public page: PageInterface = {
    id: 1,
    name: 'test'
  };

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  ngOnInit(): void {
  }

  public isFormFieldType(type: string) {
    return type === 'string' || type === 'number';
  }

  public isComponent(type: string): boolean {
    return customElements.get(type) !== undefined;
  }
}
