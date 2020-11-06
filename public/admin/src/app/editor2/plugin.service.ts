import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ImageComponent} from "./elements/image/image.component";
import {LayoutComponent} from "./elements/layout/layout.component";
import {TextComponent} from "./elements/text/text.component";
import {TemplateComponent} from "./elements/template/template.component";

@Injectable({
  providedIn: 'root'
})
export class PluginService {
  private http: HttpClient;

  private $types = [
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
      name: 'Element',
      type: 'element',
      component: LayoutComponent
    },
    {
      name: 'Image',
      type: 'image',
      component: ImageComponent
    }
  ];

  constructor(http: HttpClient) {
    this.http = http
  }

  public getTypes() {
    return this.$types.map((el) => {
      return {
        name: el.name,
        type: el.type
      };
    });
  }

  public getComponent(type: string): any {
    console.log(type);
    return this.$types.find((el) => {
      return el.type === type;
    }).component;
  }
}
