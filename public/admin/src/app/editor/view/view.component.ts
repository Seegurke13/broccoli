import {
  Component,
  OnInit,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
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

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  public onSave() {
    console.log(this.elements);
  }
}
