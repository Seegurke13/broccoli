import { Injectable } from '@angular/core';
import {PluginModel} from "./plugin.model";
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
      text: new PluginModel(TextComponent, [], []),
      layout: new PluginModel(LayoutComponent, [], []),
      default: new PluginModel(DefaultComponent, [], []),
      provider: new PluginModel(DataProviderComponent, [], []),
      image: new PluginModel(ImageComponent, [], []),
      template: new PluginModel(TemplateComponent, [], []),
      code: new PluginModel(CodeComponent, [], [])
    };
  }

  public getPlugins() {
    return this.plugins;
  }
}
