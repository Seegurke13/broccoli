import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageComponent} from './page/page.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatTreeModule} from "@angular/material/tree";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {PageViewComponent} from './page/page-view/page-view.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import { PageTreeComponent } from './page/page-tree/page-tree.component';
import {Editor2Module} from "../editor2/editor2.module";
import { StaticFieldsComponent } from './static-fields/static-fields.component';
import {MatListModule} from "@angular/material/list";
import {RouterModule} from "@angular/router";
import {TreeModule} from "primeng/tree";
import {PageRoutingModule} from "./page-routing.module";


@NgModule({
  declarations: [PageComponent, PageViewComponent, PageTreeComponent, StaticFieldsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    TreeModule,
    MatRadioModule,
    Editor2Module,
    MatListModule,
    RouterModule,
    PageRoutingModule
  ]
})
export class PageModule {
}
