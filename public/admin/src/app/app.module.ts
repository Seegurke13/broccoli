import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DataModule} from "./data/data.module";
import {PageModule} from "./page/page.module";
import { FlexLayoutModule, BREAKPOINTS } from '@angular/flex-layout';
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FileModule} from "./file/file.module";
import {Editor2Module} from "./editor2/editor2.module";
import {FormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";

const EXTRA_BREAKPOINTS = [{
  alias: 'xs.landscape',
  suffix: 'XsLandscape',
  mediaQuery: 'screen and (orientation: landscape) and (max-width: 559px)',
  priority: 1000,
  overlapping: false
}];

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        DataModule,
        PageModule,
        FileModule,
        Editor2Module,
        FlexLayoutModule,
        HttpClientModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule
    ],
  providers: [
    {
      provide: BREAKPOINTS,
      useValue: EXTRA_BREAKPOINTS,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
