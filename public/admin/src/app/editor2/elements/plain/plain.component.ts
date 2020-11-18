import { Component, OnInit } from '@angular/core';
import {PluginElement} from "../../plugin-element";

@Component({
  selector: 'div[plain]',
  templateUrl: './plain.component.html',
  styleUrls: ['./plain.component.scss']
})
export class PlainComponent extends PluginElement<PlainComponent> implements OnInit {
  options = {
    theme: 'vs-dark',
    language: 'javascript',
  };

  code: string = `
    function foo() {
      alert('Hello');
      alert('World');
      alert('Hello World.');
    }`;


  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
