import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { ElementComponent } from './element/element.component';
import { ElementHostDirective } from './element-host.directive';
import { LayoutComponent } from './elements/layout/layout.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import { TextComponent } from './elements/text/text.component';
import { DefaultComponent } from './elements/default/default.component';
import { SliderComponent } from './elements/slider/slider.component';
import { ImageComponent } from './elements/image/image.component';
import { CustomComponent } from './elements/custom/custom.component';
import { DataProviderComponent } from './data-provider/data-provider.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatChipsModule} from "@angular/material/chips";
import {MatInputModule} from "@angular/material/input";
import { TextareaComponent } from './ui/textarea/textarea.component';
import { FileComponent } from './ui/file/file.component';
import { InputComponent } from './ui/input/input.component';



@NgModule({
    declarations: [
      ViewComponent,
      ElementComponent,
      ElementHostDirective,
      LayoutComponent,
      TextComponent,
      DefaultComponent,
      SliderComponent,
      ImageComponent,
      CustomComponent,
      DataProviderComponent,
      TextareaComponent,
      FileComponent,
      InputComponent
    ],
    exports: [
        ViewComponent
    ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatInputModule
  ]
})
export class EditorModule { }
