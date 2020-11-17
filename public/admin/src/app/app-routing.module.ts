import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataComponent} from "./data/data/data.component";
import {PageComponent} from "./page/page/page.component";
import {StaticFieldsComponent} from "./page/static-fields/static-fields.component";


const routes: Routes = [
  {
    path: 'data',
    component: DataComponent
  },
  {
    path: 'content',
    component: PageComponent
  },
  {
    path: 'content/static-fields',
    component: StaticFieldsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
