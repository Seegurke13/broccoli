import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSelectChange} from "@angular/material/select";
import {PluginElement} from "../../plugin-element";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent extends PluginElement<TemplateComponent> {
  @Input()
  public values: any;
  @ViewChild('toolbar')
  public toolbar;
  @ViewChild('settings')
  public settings: any;

  private http: HttpClient;

  constructor(http: HttpClient) {
    super();
    this.http = http;
  }

  ngOnInit(): void {
    // this.http.get('http://localhost/pagemodule/template/getPlaceholder/'+this.values.template).subscribe((placeholders: string[]) => {
    //   placeholders.forEach((el) => {
    //     if (this.values.placeholder.find((tmp) => {return el === tmp.name}) === undefined) {
    //       this.values.placeholder.push({
    //         name: el,
    //         element: {}
    //       });
    //     }
    //   });
    // });
  }

  public addPlaceholder() {
    if (this.values.placeholder === undefined) {
      this.values.placeholder = [];
    }

    if (this.values.placeholder.find((el) => {return el.name === 'New';})) {
      return;
    }

    this.values.placeholder.push({
      name: 'New',
      element: {}
    });
  }

  public delete(i: number) {
    this.values.placeholder.splice(i, 1);
  }

  public onTemplateChange($event: MatSelectChange) {
    this.values.placeholder = [];
    this.http.get('http://localhost/pagemodule/template/getPlaceholder/'+$event.value).subscribe((placeholders: string[]) => {
      placeholders.forEach((el) => {
        if (this.values.placeholder.find((tmp) => {return el === tmp.name}) === undefined) {
          this.values.placeholder.push({
            name: el,
            element: {}
          });
        }
      });
    });
  }

  ngAfterContentInit(): void {
    // console.log(this.values);
    // if (!this.values.template) {
    //   return;
    // }
    // this.http.get('http://localhost/pagemodule/template/getPlaceholder/'+this.values.template).subscribe((placeholders: string[]) => {
    //   placeholders.forEach((el) => {
    //     if (this.values.placeholder.find((tmp) => {return el === tmp.name}) === undefined) {
    //       this.values.placeholder.push({
    //         name: el,
    //         element: {}
    //       });
    //     }
    //   });
    // });
  }
}
