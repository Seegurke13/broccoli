import {Component, Input, OnInit} from '@angular/core';
import {ElementInterface} from "../element.interface";

@Component({
  selector: 'app-data-provider',
  templateUrl: './data-provider.component.html',
  styleUrls: ['./data-provider.component.scss']
})
export class DataProviderComponent implements OnInit, ElementInterface {
  @Input()
  public content: any;
  @Input()
  public properties: any;
  @Input()
  public type: string;

  constructor() {

  }

  ngOnInit(): void {
  }
}
