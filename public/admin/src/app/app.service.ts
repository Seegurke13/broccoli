import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {TestComponent} from "./test/test.component";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AppService {
  private http: HttpClient;
  private router: Router;

  constructor(router: Router, http: HttpClient) {
    this.router = router;
    this.http = http;
  }

  init() {
    return new Promise<void>((resolve, reject) => {
      const newDynamicRoutes = ['user']
      const routes = this.router.config;

      // {
      //   path: 'user',
      //     loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      // }
      this.http.get('http://localhost/admin/module').subscribe((data: any) => {
        console.log('yesy');
      });

      newDynamicRoutes.forEach(routeName => {
        routes.push({ path: routeName, component: TestComponent });
      });

      this.router.resetConfig(routes);
      resolve();
    });
  }
}
