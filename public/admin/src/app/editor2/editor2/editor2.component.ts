import {Component, Input, OnInit} from '@angular/core';
import {ElementModel} from "../element.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-editor2',
  templateUrl: './editor2.component.html',
  styleUrls: ['./editor2.component.scss']
})
export class Editor2Component implements OnInit {
  @Input()
  public content: ElementModel = {
    type: 'template',
    settings: {}
  };
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  ngOnInit(): void {
  }

  debug() {
    console.log(this.content);
    console.log(JSON.stringify(this.content))
  }
}
