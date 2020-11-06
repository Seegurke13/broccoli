import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent } from './file/file.component';
import { FileModalComponent } from './file-modal/file-modal.component';
import {TreeModule} from "primeng";

@NgModule({
  declarations: [FileComponent, FileModalComponent],
  imports: [
    CommonModule,
    TreeModule
  ]
})
export class FileModule { }
