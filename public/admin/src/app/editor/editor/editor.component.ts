import {
  Component,
  OnInit,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  public elements: any = [
    {
      name: '',
      type: 'layout',
      properties: [],
      content: [
        {
          type: 'text',
          content: {
            value: 'test'
          },
          properties: {
          }
        },
        {
          type: 'image',
          content: {
            src: '',
            alt: 'hmmmmm'
          },
          properties: {}
        }
      ]
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  public onSave() {
    console.log(this.elements);
  }

  public removeElement(i: number) {
    this.elements.splice(i, 1);
  }
}
