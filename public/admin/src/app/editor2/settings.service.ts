import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ToolbarService} from "../toolbar.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private obserable: Subject<any>;
  private toolbarService: ToolbarService;

  constructor(toolbarService: ToolbarService) {
    this.toolbarService = toolbarService;
    this.obserable = new Subject<any>();
  }

  public setSettings(settings) {
    this.toolbarService.setToolbar(settings);
  }

  public getObservable() {
    return this.obserable.asObservable();
  }
}
