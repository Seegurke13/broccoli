import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ElementInterface} from "../../element.interface";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, ElementInterface{
  @Input()
  public content: any;

  @ViewChild('toolbar')
  public toolbar;
  @ViewChild('settings')
  public settings;

  constructor() { }

  ngOnInit(): void {
    if (!this.content.children) {
      this.content.children = [];
    }
  }

  public addSection() {
    this.content.children.push({});
  }

  public onDelete(el: number) {
    this.content.children.splice(el, 1);
  }

  public onAdd() {
    this.content.children.push({});
  }
}
