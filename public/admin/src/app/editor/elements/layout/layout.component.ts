import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {EditorElementComponent} from "../../editorElementComponent";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, EditorElementComponent{
  @Input()
  public content: any[] = [];
  @Input()
  public properties: any;
  public type: string;
  @ViewChild('toolbar')
  public toolbar;
  @ViewChild('settings')
  public settings;

  constructor() { }

  ngOnInit(): void {
    if (Array.isArray(this.content) === false) {
      this.content = [];
    }
    this.content.length < 1 ? this.content.push({}) : '';

    if (this.properties.direction === undefined) {
      this.properties.direction = 'row';
    }
  }

  public getToolbar() {
    return [
      {
        name: 'test',
        icon: '',
        action: 'addSection'
      }
    ];
  }

  public addSection() {
    if (Array.isArray(this.content) === false) {
      this.content = [];
    }
    this.content.push({});
  }

  public onDelete(el: number) {
    this.content.splice(el, 1);
  }

  public onAdd() {
    this.content.push({});
  }
}
