import {Injectable, TemplateRef} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  private obserable: Subject<any>;

  constructor() {
    this.obserable = new Subject<any>();
  }

  public setToolbar(toolbar: TemplateRef<any>) {
    this.obserable.next(toolbar);
  }

  public getObservable() {
    return this.obserable.asObservable();
  }
}
