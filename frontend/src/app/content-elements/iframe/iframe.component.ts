import { Component, OnInit } from '@angular/core';
import {PluginElement} from "../../editor2/plugin-element";

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent extends PluginElement<IframeComponent> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    if (!this.values.src) {
      this.values.src = '';
    }
  }

}
