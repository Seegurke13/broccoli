import { Injectable } from '@angular/core';
import {ElementModel} from "./element.model";
import {TextComponent} from "./elements/text/text.component";
import {LayoutComponent} from "./elements/layout/layout.component";
import {DefaultComponent} from "./elements/default/default.component";
import {DataProviderComponent} from "./data-provider/data-provider.component";
import {ImageComponent} from "./elements/image/image.component";
import {TemplateComponent} from "./elements/template/template.component";
import {CodeComponent} from "./elements/code/code.component";

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private plugins: any;

  constructor() {
    this.plugins = {
      text: new ElementModel(TextComponent, [], []),
      layout: new ElementModel(LayoutComponent, [], []),
      default: new ElementModel(DefaultComponent, [], []),
      provider: new ElementModel(DataProviderComponent, [], []),
      image: new ElementModel(ImageComponent, [], []),
      template: new ElementModel(TemplateComponent, [], []),
      code: new ElementModel(CodeComponent, [], [])
    };
  }

  public getPlugins() {
    return this.plugins;
  }
}
