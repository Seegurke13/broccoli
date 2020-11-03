import {Component, Input, OnInit} from '@angular/core';
import {ElementInterface} from "../../element.interface";
import {HttpClient} from "@angular/common/http";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, ElementInterface {
  @Input()
  public content: any;
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  ngOnInit(): void {
  }

  public addPlaceholder() {
    if (this.content.placeholder === undefined) {
      this.content.placeholder = [];
    }

    if (this.content.placeholder.find((el) => {return el.name === 'New';})) {
      return;
    }

    this.content.placeholder.push({
      name: 'New',
      content: {}
    });
  }

  public delete(i: number) {
    this.content.placeholder.splice(i, 1);
  }

  public onDelete(i: number) {
    this.content.placeholder[i].type = '';
    this.content.placeholder[i].content = {};
  }

  public onTemplateChange($event: MatSelectChange) {
    this.content.placeholder = [];
    this.http.get('http://localhost/module/pagemodule/template/getPlaceholder/'+$event.value).subscribe((placeholders: string[]) => {
      placeholders.forEach((el) => {
        if (this.content.placeholder.find((tmp) => {return el === tmp.name}) === undefined) {
          this.content.placeholder.push({
            name: el,
            content: {}
          });
        }
      });
    });
  }
}
