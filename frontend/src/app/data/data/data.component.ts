import { Component, OnInit } from '@angular/core';
import {ListingConfigComponent} from "../listing-config/listing-config.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  public dialog: MatDialog;
  public listing: any;

  constructor(dialog: MatDialog) {
    this.dialog = dialog;
  }

  ngOnInit(): void {
  }

  public onNewListing() {
    let dialogRef = this.dialog.open(ListingConfigComponent, {
      height: '400px',
      width: '600px',
    });
  }

  public onSelectListing(id: number) {
    this.listing = {
      id: 1,
      name: 'Listing 1',
      fields: [
        {
          name: 'name',
          type: 'string'
        }
      ]
    }
  }
}
