import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageComponent} from "./page/page.component";
import {StaticFieldsComponent} from "./static-fields/static-fields.component";
import {FormComponent} from "./form/form.component";
import {ThemeComponent} from "./theme/theme.component";


const routes: Routes = [
  {
    path: 'page',
    redirectTo: 'page/',
  },
  {
    path: 'page/:id',
    component: PageComponent,
  },
  {
    path: '',
    redirectTo: 'page/',
    pathMatch: 'full'
  },
  {
    path: 'form/:id',
    component: FormComponent
  },
  {
    path: 'form',
    redirectTo: 'form/',
  },
  {
    path: 'template/:id',
    component: ThemeComponent
  },
  {
    path: 'template',
    redirectTo: 'template/'
  },
  {
    path: 'field/:id',
    component: StaticFieldsComponent
  },
  {
    path: 'field',
    redirectTo: 'field/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
