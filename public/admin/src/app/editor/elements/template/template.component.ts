import {Component, Input, OnInit} from '@angular/core';
import {ElementInterface} from "../../element.interface";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, ElementInterface {
  @Input()
  public content: any;

  constructor() { }

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
}
