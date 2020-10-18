import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatTreeModule} from "@angular/material/tree";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { PageViewComponent } from './page-view/page-view.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import { PageComponentComponent } from './page-component/page-component.component';
import { PageCustomComponent } from './page-custom/page-custom.component';
import {QuillModule} from "ngx-quill";
import { ShowModulesComponent } from './show-modules/show-modules.component';
import {MatCardModule} from "@angular/material/card";
import {TreeModule} from "primeng";
import {MatRadioModule} from "@angular/material/radio";
import {EditorModule} from "../editor/editor.module";


@NgModule({
  declarations: [PageComponent, PageViewComponent, PageComponentComponent, PageCustomComponent, ShowModulesComponent],
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
        MatTabsModule,
        QuillModule.forRoot({}),
        MatCardModule,
        TreeModule,
        MatRadioModule,
      EditorModule
    ]
})
export class PageModule { }
