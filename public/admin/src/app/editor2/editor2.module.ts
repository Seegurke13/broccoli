import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Editor2Component} from "./editor2/editor2.component";
import {ElementComponent} from "./element/element.component";
import {SettingsComponent} from "./settings/settings.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatChipsModule} from "@angular/material/chips";
import {MatInputModule} from "@angular/material/input";
import {EditorPluginDirective} from "./toolbar/editor-plugin.directive";
import {ImageComponent} from "./elements/image/image.component";
import {FileModule} from "../file/file.module";
import {MatDialogModule} from "@angular/material/dialog";
import {LayoutComponent} from "./elements/layout/layout.component";
import {TextComponent} from "./elements/text/text.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {TemplateComponent} from "./elements/template/template.component";
import {ChildrenComponent} from "./elements/layout/children/children.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";


@NgModule({
  declarations: [
    Editor2Component,
    ElementComponent,
    SettingsComponent,
    ToolbarComponent,
    EditorPluginDirective,
    ImageComponent,
    LayoutComponent,
    TextComponent,
    TemplateComponent,
    ChildrenComponent
  ],
  exports: [
    Editor2Component
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
    ReactiveFormsModule
  ]
})
export class Editor2Module { }
