import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ListingService} from "../listing.service";
import {DataSource} from "@angular/cdk/collections";
import {ListingDataSource} from "../listing.data-source";
import {MatTableDataSource} from "@angular/material/table";
import {map} from "rxjs/operators";
import {MatPaginator} from "@angular/material/paginator";

const ELEMENT_DATA: any[] = [
  {
    name: 'test'
  }
];

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  @Input()
  public listing: {
    name: string,
    fields: {name: string, type: string}[]
  }
  private listingService: ListingService;

  public dataSource: MatTableDataSource<unknown>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public count: any;

  public isLoading: boolean = false;

  constructor(listingService: ListingService) {
    this.dataSource = new MatTableDataSource();
    this.listingService = listingService;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.isLoading = true;
    this.listingService.getListingData(1, 0, 20).subscribe((res:any) => {
      this.dataSource.data = res.results;
      this.count = res.count;
      this.isLoading = false;
    });
  }

  getCols() {
    return this.listing.fields.map((field) => {
      return field.name;
    });
  }
}
