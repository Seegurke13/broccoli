import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule, BREAKPOINTS} from '@angular/flex-layout';
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FileModule} from "./file/file.module";
import {Editor2Module} from "./editor2/editor2.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MonacoEditorModule} from "ngx-monaco-editor";
import {TestComponent} from './test/test.component';
import {AppService} from "./app.service";
import {CommonModule} from "@angular/common";

const EXTRA_BREAKPOINTS = [{
  alias: 'xs.landscape',
  suffix: 'XsLandscape',
  mediaQuery: 'screen and (orientation: landscape) and (max-width: 559px)',
  priority: 1000,
  overlapping: false
}];

export function initializeApp(appInitService: AppService) {
  return (): Promise<any> => {
    return appInitService.init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
  ],
  imports: [
    // CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FileModule,
    Editor2Module,
    FlexLayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [
    {
      provide: BREAKPOINTS,
      useValue: EXTRA_BREAKPOINTS,
      multi: true
    },
    AppService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AppService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
