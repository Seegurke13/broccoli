import {Route, RouterModule} from "@angular/router";
import {SettingsComponent} from "./settings/settings.component";
import {NgModule} from "@angular/core";
import {ExtensionsComponent} from "./extensions/extensions.component";

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: SettingsComponent
  },
  {
    path: 'extensions',
    component: ExtensionsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
