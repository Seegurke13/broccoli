import { Injectable } from '@angular/core';
import {TextComponent} from "./elements/text/text.component";
import {LayoutComponent} from "./elements/layout/layout.component";
import {ImageComponent} from "./elements/image/image.component";
import {TemplateComponent} from "./elements/template/template.component";

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
      }
    ];
  }

  public getPlugins() {
    return this.plugins;
  }
}
