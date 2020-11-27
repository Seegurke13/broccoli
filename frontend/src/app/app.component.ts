import {Component, Injector, NgModuleFactory, NgModuleFactoryLoader, SystemJsNgModuleLoader} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TestComponent} from "./test/test.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin';

  constructor() {
  }
}
