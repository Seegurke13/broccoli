import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getListingData(id: number, pageNumber: number, pageSize: number) {
    return this.http.get('http://localhost:80/api/data/listing/' + id, {
      params: new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    });
  }
}
