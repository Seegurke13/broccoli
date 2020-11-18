import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-static-fields',
  templateUrl: './static-fields.component.html',
  styleUrls: ['./static-fields.component.scss']
})
export class StaticFieldsComponent implements OnInit {
  public field: any = {};
  public fields = [
    {
      name: 'Test',
      field: 1
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
