import {Component, Input, OnInit} from '@angular/core';
import {EditorElementComponent} from "../../editorElementComponent";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, EditorElementComponent {
  @Input()
  public content: any;

  constructor() { }

  ngOnInit(): void {
      if (!this.content) {
        this.content = {};
      }
      if (!(this.content.template)) {
        this.content.template = '';
      }
  }
}
