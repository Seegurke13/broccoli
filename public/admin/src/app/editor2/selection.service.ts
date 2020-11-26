import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private readonly observable: Subject<any>;

  constructor() {
    this.observable = new Subject<any>();
  }

  public emit(data) {
    this.observable.next(data);
  }

  public getObservable() {
    return this.observable.asObservable();
  }
}
