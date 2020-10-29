import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataComponent} from "./data/data/data.component";
import {PageComponent} from "./page/page/page.component";
import {FileComponent} from "./editor/ui/file/file.component";
import {FilesComponent} from "./file/files/files.component";


const routes: Routes = [
  {
    path: 'data',
    component: DataComponent
  },
  {
    path: 'pages',
    component: PageComponent
  },
  {
    path: 'files',
    component: FilesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
