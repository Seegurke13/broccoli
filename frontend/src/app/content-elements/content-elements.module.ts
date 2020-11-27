import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from "./layout/layout.component";
import {MatChipsModule} from "@angular/material/chips";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {Editor2Module} from "../editor2/editor2.module";
import {MatTreeModule} from "@angular/material/tree";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatListModule} from "@angular/material/list";
import {ContentRoutingModule} from "../content/content-routing.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {TemplateComponent} from "./template/template.component";
import {TextComponent} from "./text/text.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ImageComponent} from "./image/image.component";



@NgModule({
  declarations: [
    // PlainComponent,
    // TwigComponent,
    // IframeComponent,
    // LoopComponent,
    // CarouselComponent,
    ImageComponent,
    LayoutComponent,
    TextComponent,
    TemplateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    FormsModule,
    MatRadioModule,
    Editor2Module,
    MatListModule,
    ContentRoutingModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContentElementsModule { }
