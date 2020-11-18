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
import {ImageComponent} from "./elements/image/image.component";
import {FileModule} from "../file/file.module";
import {MatDialogModule} from "@angular/material/dialog";
import {LayoutComponent} from "./elements/layout/layout.component";
import {TextComponent} from "./elements/text/text.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {TemplateComponent} from "./elements/template/template.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { HtmlComponent } from './html/html.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { ContainerComponent } from './elements/container/container.component';
import { ElementPluginDirective } from './element-plugin.directive';
import { DefaultComponent } from './elements/default/default.component';
import { ElementSelectionModalComponent } from './element-selection-modal/element-selection-modal.component';
import { SafePipe } from './safe.pipe';
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    Editor2Component,
    ImageComponent,
    LayoutComponent,
    TextComponent,
    TemplateComponent,
    HtmlComponent,
    ContainerComponent,
    ElementPluginDirective,
    DefaultComponent,
    ElementSelectionModalComponent,
    SafePipe
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
    ReactiveFormsModule,
    MatSidenavModule,
    MatMenuModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class Editor2Module { }
