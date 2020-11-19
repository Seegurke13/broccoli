import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ToolbarService} from "../toolbar.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private obserable: Subject<any>;

  constructor() {
    this.obserable = new Subject<any>();
  }

  public setSettings(settings) {
    this.obserable.next(settings);
  }

  public getObservable() {
    return this.obserable.asObservable();
  }
}
