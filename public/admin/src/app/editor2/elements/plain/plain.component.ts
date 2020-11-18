import { Component, OnInit } from '@angular/core';
import {PluginElement} from "../../plugin-element";

@Component({
  selector: 'div[plain]',
  templateUrl: './plain.component.html',
  styleUrls: ['./plain.component.scss']
})
export class PlainComponent extends PluginElement<PlainComponent> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
