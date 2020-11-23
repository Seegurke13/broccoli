import {Component, Injector, NgModuleFactory, NgModuleFactoryLoader, SystemJsNgModuleLoader} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TestComponent} from "./test/test.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader } ]
})
export class AppComponent {
  title = 'admin';
  private router: Router;
  private http: HttpClient;

  constructor(router: Router, http: HttpClient, private loader: NgModuleFactoryLoader) {
    this.router = router;
    this.http = http;

    // const routes = this.router.config;
    // this.router.config.push({ path: 'user', loadChildren: () => this.loader.load('src/app/user/user.module#UserModule').then((m => m.moduleType))});
    // this.router.resetConfig(routes);
  }
}
