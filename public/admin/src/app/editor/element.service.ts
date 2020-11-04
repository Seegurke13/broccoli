import { Injectable } from '@angular/core';
import {PluginModel} from "./plugin.model";
import {TextComponent} from "./elements/text/text.component";
import {LayoutComponent} from "./elements/layout/layout.component";
import {DefaultComponent} from "./elements/default/default.component";
import {ImageComponent} from "./elements/image/image.component";
import {TemplateComponent} from "./elements/template/template.component";
import {CodeComponent} from "./elements/code/code.component";
import {HtmlelementComponent} from "./elements/htmlelement/htmlelement.component";

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private plugins: any;

  constructor() {
    this.plugins = [
      {
        name: 'Text',
        type: 'text',
        component: TextComponent,
        container: ['content']
      },
      {
        name: 'Layout',
        type: 'layout',
        component: LayoutComponent,
        container: ['content']
      },
      {
        name: 'Image',
        type: 'image',
        component: ImageComponent,
        container: ['content']
      },
      {
        name: 'Template',
        type: 'template',
        component: TemplateComponent,
        container: ['page']
      },
      {
        name: 'HTML Element',
        type: 'htmlelement',
        component: HtmlelementComponent,
        container: ['content']
      }
    ];
  }

  public getPlugins() {
    return this.plugins;
  }
}
