import {Compiler, Injectable, Injector, NgModuleFactory, NgModuleFactoryLoader} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";

import * as AngularCommon from '@angular/common';
import * as AngularCore from '@angular/core';


@Injectable()
export class AppService {
  private http: HttpClient;
  private router: Router;

  constructor(router: Router, http: HttpClient, private loader: NgModuleFactoryLoader) {
    this.router = router;
    this.http = http;
  }

  init() {
    return new Promise<void>((resolve, reject) => {
      this.http.get('http://localhost/admin/module').subscribe((data: any) => {
        const routes = this.router.config;

        data.forEach((module) => {
          this.router.config.push({
            path: module.name,
            loadChildren: () => this.loader.load(module.file).then((m => m.moduleType))
          });
          this.router.resetConfig(routes);
        });

        resolve();
      });
    });
  }
}
