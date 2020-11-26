import { Injectable } from '@angular/core';
import {TextComponent} from "./elements/text/text.component";
import {TemplateComponent} from "./elements/template/template.component";
import {LayoutComponent} from "./elements/layout/layout.component";
import {ImageComponent} from "./elements/image/image.component";
import {PlainComponent} from "./elements/plain/plain.component";
import {IframeComponent} from "./elements/iframe/iframe.component";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PluginRepositoryService {
  private plugins: any[] = [
    {
      name: 'Text',
      type: 'text',
      component: TextComponent
    },
    {
      name: 'Template',
      type: 'template',
      component: TemplateComponent
    },
    {
      name: 'layout',
      type: 'layout',
      component: LayoutComponent
    },
    {
      name: 'Image',
      type: 'image',
      component: ImageComponent
    },
    {
      name: 'HTML',
      type: 'html',
      component: PlainComponent
    },
    {
      name: 'Iframe',
      type: 'iframe',
      component: IframeComponent
    },
    {
      name: 'Group',
      type: 'group',
      component: IframeComponent
    }
  ];

  constructor(http: HttpClient) {
  }

  public getPlugins() {
    return this.plugins;
  }
}
