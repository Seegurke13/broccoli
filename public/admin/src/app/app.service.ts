import {Compiler, Injectable, Injector, NgModuleFactory, NgModuleFactoryLoader} from '@angular/core';
import {Route, Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";

import * as AngularCommon from '@angular/common';
import * as AngularCore from '@angular/core';
import {AppModuleService} from "./app-module.service";


@Injectable()
export class AppService {
  private http: HttpClient;
  private router: Router;
  private moduleService: AppModuleService;

  constructor(router: Router, http: HttpClient, moduleService: AppModuleService) {
    this.router = router;
    this.http = http;
    this.moduleService = moduleService;
  }

  init() {
    return new Promise<void>((resolve, reject) => {
      this.http.get('http://localhost/admin/config').subscribe((data: any) => {
        const routes = this.router.config;
        let loadedModules = data.modules.map((module) => {
          return this.moduleService.loadModule(module);
        });

        Promise.all(loadedModules).then((modules: any[]) => {
          data.routes.forEach((el) => {
            this.router.config.push(this.buildRoute(el, modules));

            // this.router.config.push({
            //   path: el.path,
            //   component: modules.find((m => m.name === el.component.split('.')[0])).components[el.component.split('.')[1]].component
            // });
          });

          this.router.resetConfig(routes);
          console.log(routes);

          resolve();
        });
      });
    });
  }

  private buildRoute(el, modules): Route {
    let route =  {
      path: el.path
    }

    if (el.component) {
      route['component'] = modules.find((m => m.name === el.component.split('.')[0])).components[el.component.split('.')[1]].component;
    }

    if (el.children && el.children.length > 0) {
      let tmp = el.children.map((el1) => {return this.buildRoute(el1, modules)});
      console.log(el.children, tmp);
      route['children'] = tmp;
    }

    return route;
  }
}
