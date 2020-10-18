import {Component, Input, OnInit} from '@angular/core';
import {EditorElementComponent} from "../../editorElementComponent";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit, EditorElementComponent{
  @Input()
  public content: any = {src: '', alt: ''};
  @Input()
  public properties: any;
  @Input()
  public type: string;

  constructor() { }

  ngOnInit(): void {
    if (!this.content ) {
      this.content = {};
    }
    if (this.content.src === undefined) {
      this.content.src = '';
    }
    if (this.content.alt === undefined) {
      this.content.alt = 'hmmm';
    }
  }
}
