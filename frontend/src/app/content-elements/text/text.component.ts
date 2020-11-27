import {Component} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {PluginElement} from "../../editor2/plugin-element";

@Component({
  selector: 'div[text]',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent extends PluginElement<TextComponent>{
  public Editor = ClassicEditor;

  constructor() {
    super();
  }

  ngOnInit(): void {
    if (!this.values.classes) {
      this.values.classes = [];
    }
  }
}
