import {Component, Input, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  @Input()
  public content: any = {};
  public Editor = ClassicEditor;

  constructor() {
    if (this.content.value === undefined) {
      this.content.value = '';
    }
  }

  ngOnInit(): void {

  }
}
