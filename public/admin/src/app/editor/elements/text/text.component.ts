import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  @Input()
  public content: any = {
    value: ''
  };

  constructor() { }

  ngOnInit(): void {
    if (this.content === undefined) {
      this.content = {};
    }
    if (this.content.value === undefined) {
      this.content.value = '';
    }
  }
}
