import {Type} from "@angular/core";

export class PluginModel {
  private component: Type<any>;
  private content: any[];
  private properties: any;

  constructor(component: Type<any>, children: any[], attributes: any) {
    this.component = component;
    this.content = children;
    this.properties = attributes;
  }

  public getContent() : any[]{
    return this.content;
  }

  public getProperties() : any[]{
    return this.properties;
  }

  public getComponent(): Type<any> {
    return this.component;
  }
}
