import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-config',
  templateUrl: './listing-config.component.html',
  styleUrls: ['./listing-config.component.scss']
})
export class ListingConfigComponent implements OnInit {
  public fields = [];
  public types = ['string', 'integer'];

  constructor() { }

  public ngOnInit(): void {
  }

  public onNewField() {
    this.fields.push({
      name: 'Neu',
      type: 'string'
    });
  }

  public onDeleteField(i: number) {
    this.fields.splice(i, 1);
  }

  public onSave() {

  }
}
