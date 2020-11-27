import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Editor2Component} from "./editor2/editor2.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatChipsModule} from "@angular/material/chips";
import {MatInputModule} from "@angular/material/input";
import {FileModule} from "../file/file.module";
import {MatDialogModule} from "@angular/material/dialog";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { HtmlComponent } from './html/html.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { ElementPluginDirective } from './element-plugin.directive';
import { ElementSelectionModalComponent } from './element-selection-modal/element-selection-modal.component';
import { SafePipe } from './safe.pipe';
import {MatMenuModule} from "@angular/material/menu";
import { ClasslistComponent } from './classlist/classlist.component';
import {MonacoEditorModule} from "ngx-monaco-editor";


@NgModule({
  declarations: [
    Editor2Component,
    ElementPluginDirective,
    ElementSelectionModalComponent,
    SafePipe,
    ClasslistComponent,
    // PlainComponent,
    // TwigComponent,
    // IframeComponent,
    // LoopComponent,
    // CarouselComponent,
    // ImageComponent,
    // LayoutComponent,
    // TextComponent,
    // TemplateComponent,
    HtmlComponent
  ],
  exports: [
    Editor2Component,
    HtmlComponent,
    ClasslistComponent,
    ElementPluginDirective,
    SafePipe
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatChipsModule,
    MatInputModule,
    FileModule,
    CKEditorModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatMenuModule,
    MonacoEditorModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class Editor2Module { }
