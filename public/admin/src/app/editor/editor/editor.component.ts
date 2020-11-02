import {
  Component, Input, OnChanges,
  OnInit,
  Renderer2, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input()
  public elements: any|any[];

  @Input()
  public multi: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public onSave() {
    let test = Object.assign({}, this.elements);
    console.log(JSON.stringify(test));
  }

  public removeElement(i: number) {
    this.elements.splice(i, 1);
  }
}
