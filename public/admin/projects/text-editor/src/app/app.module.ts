import { BrowserModule } from '@angular/platform-browser';
import {DoBootstrap, Injector, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {QuillModule} from "ngx-quill";
import {createCustomElement} from "@angular/elements";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    QuillModule.forRoot({

    })
  ],
  providers: [],
  entryComponents:[
    AppComponent
  ]
})
export class AppModule implements DoBootstrap {
  private injector: Injector;

  constructor(injector: Injector) {
    this.injector = injector;
  }

  ngDoBootstrap() {
    const externalTileCE = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('external-dashboard-tile', externalTileCE);
  }
}
