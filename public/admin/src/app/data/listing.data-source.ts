import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, of} from "rxjs";
import {ListingService} from "./listing.service";
import {catchError, finalize} from "rxjs/operators";

export class ListingDataSource implements DataSource<any> {
  private listingSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  private listingService: ListingService;

  constructor(listingService: ListingService) {
    this.listingService = listingService;
  }

  public connect(collectionViewer: CollectionViewer): Observable<any[] | ReadonlyArray<any[]>> {
    return this.listingSubject.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this.listingSubject.complete();
    this.loadingSubject.complete();
  }

  public load(
    id: number,
    sortDirection: string = 'asc',
    pageIndex: number = 0,
    pageSize: number = 3
  ) {
    this.loadingSubject.next(true);

    this.listingService.getListingData(id,
      pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe((listing:any[]) => this.listingSubject.next(listing));
  }
}
