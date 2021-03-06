import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PluginRepositoryService} from "./plugin-repository.service";

@Injectable({
  providedIn: 'root'
})
export class PluginService {
  private http: HttpClient;

  private pluginRepository: PluginRepositoryService;
  private types = [];

  constructor(http: HttpClient, pluginRepository: PluginRepositoryService) {
    this.http = http
    this.pluginRepository = pluginRepository;
  }

  public getComponent(type: string): any {
    // console.log(type);
    return this.types.find((el) => {
      return el.type === type;
    }).component;

    // return this.pluginRepository.getPlugins().find((el) => {
    //   return el.type === type;
    // })?.component;
  }

  public getPresets(filter: string[] = null) {
    Object.keys(this.types).forEach((el) => {
      return {
        name: 'Layout',
        type: 'layout'
      };
    });
    // return this.pluginRepository.getPlugins().filter((el) => {
    //   return !filter ? true : filter.includes(el.type);
    // }).map((el) => {
    //   return {
    //     name: el.name,
    //     type: el.type
    //   };
    // });
  }

  public setPresets(types: any) {
    this.types = types;
  }
}
