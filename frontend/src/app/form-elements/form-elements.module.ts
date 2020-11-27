import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group/group.component';
import { InputComponent } from './input/input.component';



@NgModule({
  declarations: [GroupComponent, InputComponent],
  imports: [
    CommonModule
  ]
})
export class FormElementsModule { }
