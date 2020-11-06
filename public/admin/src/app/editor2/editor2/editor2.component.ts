import {Component, Input, OnInit} from '@angular/core';
import {ElementModel} from "../element.model";
import {PageInterface} from "../../page/page.interface";
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
    children: [],
    settings: {}
  };
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  ngOnInit(): void {
    // this.http.get('http://localhost:80/pagemodule/page/' + 61).subscribe((page: PageInterface) => {
    //   if (page.content === undefined) {
    //     page.content = {
    //       type: 'default',
    //       content: {},
    //       properties: {}
    //     };
    //   }
    //   this.content = page.content;
    // });
  }

  debug() {
    console.log(this.content);
    console.log(JSON.stringify(this.content))
  }
}
