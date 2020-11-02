import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  @Input()
  public content: any = {};

  constructor() {
    if (this.content.value === undefined) {
      this.content.value = '';
    }
  }

  ngOnInit(): void {

  }
}
