import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule, BREAKPOINTS} from '@angular/flex-layout';
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FileModule} from "./file/file.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MonacoEditorModule} from "ngx-monaco-editor";
import {TestComponent} from './test/test.component';
import {AppService} from "./app.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";

const EXTRA_BREAKPOINTS = [{
  alias: 'xs.landscape',
  suffix: 'XsLandscape',
  mediaQuery: 'screen and (orientation: landscape) and (max-width: 559px)',
  priority: 1000,
  overlapping: false
}];

export function initializeApp(appInitService: AppService) {
  // @ts-ignore
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
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    // Editor2Module,
    FlexLayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
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
    },
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
