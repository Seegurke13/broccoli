import { NgModule } from '@angular/core';
import { DataComponent } from './data/data.component';
import { ListingComponent } from './listing/listing.component';
import { ListingConfigComponent } from './listing-config/listing-config.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatPaginatorModule} from "@angular/material/paginator";
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatListModule} from "@angular/material/list";
import {DataRoutingModule} from "./data-routing.module";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    DataComponent,
    ListingComponent,
    ListingConfigComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatListModule,
    FlexLayoutModule,
    DataRoutingModule
  ]
})
export class DataModule { }
