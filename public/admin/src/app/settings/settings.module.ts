import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import {SettingsRoutingModule} from "./settings-routing.module";
import { ExtensionsComponent } from './extensions/extensions.component';
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";



@NgModule({
  declarations: [SettingsComponent, ExtensionsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatTableModule,
    MatTabsModule
  ]
})
export class SettingsModule { }
