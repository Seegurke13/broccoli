import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input()
  public value;
  @Output()
  public onChange: EventEmitter<{ val: string }>

  title = 'text-editor';

  constructor() {
    this.onChange = new EventEmitter<{val: string}>();
  }

  public setValue(val: string) {
    this.value = val;
  }
}
