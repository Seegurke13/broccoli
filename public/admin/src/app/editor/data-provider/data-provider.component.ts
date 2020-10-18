import {Component, Input, OnInit} from '@angular/core';
import {EditorElementComponent} from "../editorElementComponent";

@Component({
  selector: 'app-data-provider',
  templateUrl: './data-provider.component.html',
  styleUrls: ['./data-provider.component.scss']
})
export class DataProviderComponent implements OnInit, EditorElementComponent {
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
