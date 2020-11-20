import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public delete(id: number) {
    return this.http.delete('http://localhost/pagemodule/page/' + id + '/delete');
  }
}
