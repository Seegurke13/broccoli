import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-custom',
  templateUrl: './page-custom.component.html',
  styleUrls: ['./page-custom.component.scss']
})
export class PageCustomComponent implements OnInit {
  @Input()
  public name: string;
  @Input()
  public data: any;

  constructor() { }

  ngOnInit(): void {
  }
}
