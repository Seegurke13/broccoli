import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-static-fields',
  templateUrl: './static-fields.component.html',
  styleUrls: ['./static-fields.component.scss']
})
export class StaticFieldsComponent implements OnInit {
  public field: any = {
    id: 1,
    name: 'Test',
    element: {
      type: 'text',
      settings: {}
    }
  };
  public fields = [
    {
      id: 1,
      name: 'Test',
      element: {
        type: 'text',
        settings: {}
      }
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
