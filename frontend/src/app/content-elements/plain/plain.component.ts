import { Component, OnInit } from '@angular/core';
import {PluginElement} from "../../editor2/plugin-element";

@Component({
  selector: 'div[plain]',
  templateUrl: './plain.component.html',
  styleUrls: ['./plain.component.scss']
})
export class PlainComponent extends PluginElement<PlainComponent> implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'html'};

  constructor() {
    super();
  }

  ngOnInit(): void {
    if (!this.values.html) {
      this.values.html = '<p>Edit</p>';
    }
  }
}
