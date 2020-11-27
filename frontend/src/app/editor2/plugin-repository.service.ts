import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PluginRepositoryService {
  private plugins: any[] = [
    // {
    //   name: 'Text',
    //   type: 'text',
    //   component: TextComponent
    // },
    // {
    //   name: 'Template',
    //   type: 'template',
    //   component: TemplateComponent
    // },
    // {
    //   name: 'layout',
    //   type: 'layout',
    //   component: LayoutComponent
    // },
    // {
    //   name: 'Image',
    //   type: 'image',
    //   component: ImageComponent
    // },
    // {
    //   name: 'HTML',
    //   type: 'html',
    //   component: PlainComponent
    // },
    // {
    //   name: 'Iframe',
    //   type: 'iframe',
    //   component: IframeComponent
    // },
    // {
    //   name: 'Group',
    //   type: 'group',
    //   component: IframeComponent
    // }
  ];

  constructor(http: HttpClient) {
  }

  public getPlugins() {
    return this.plugins;
  }
}
