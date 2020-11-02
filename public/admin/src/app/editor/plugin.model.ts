import {Type} from "@angular/core";

export class PluginModel {
  private readonly component: Type<any>;

  constructor(component: Type<any>) {
    this.component = component;
  }

  public getComponent(): Type<any> {
    return this.component;
  }
}
