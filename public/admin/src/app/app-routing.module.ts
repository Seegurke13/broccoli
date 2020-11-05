import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataComponent} from "./data/data/data.component";
import {PageComponent} from "./page/page/page.component";
import {Editor2Component} from "./editor2/editor2/editor2.component";


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
    path: 'editor',
    component: Editor2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
