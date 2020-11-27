import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CssService {
  private http: HttpClient;
  private classes = [];

  constructor(http: HttpClient) {
    this.http = http;

    this.http.get('http://localhost/pagemodule/css/getClasses').subscribe((response: string[]) => {
      this.classes = response;
    });
  }

  public getClasses() {
    return this.classes;
  }
}
