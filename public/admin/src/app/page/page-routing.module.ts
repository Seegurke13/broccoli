import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageComponent} from "./page/page.component";


const routes: Routes = [
  {
    path: 'page',
    redirectTo: 'page/',
    pathMatch: 'full'
  },
  {
    path: 'page/:id',
    component: PageComponent
  },
  {
    path: '',
    redirectTo: 'page/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
