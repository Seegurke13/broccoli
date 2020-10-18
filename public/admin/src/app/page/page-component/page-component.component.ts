import {Component, ElementRef, Input, OnInit, ViewChild, ViewRef} from '@angular/core';

@Component({
  selector: 'app-page-component',
  templateUrl: './page-component.component.html',
  styleUrls: ['./page-component.component.scss']
})
export class PageComponentComponent implements OnInit {
  @Input()
  public type: string;
  @Input()
  public data: any;
  @ViewChild('container', { static: true})
  public container: ElementRef;

  constructor() { }

  ngOnInit(): void {
    let el: any = document.createElement(this.type);
    let isDataSet: boolean = false;
    if (el['setValue'] !== undefined) {
      el.setValue(this.data);
      isDataSet = true;
    } else {
      if (el.hasOwnProperty('value')) {
        el.value = this.data;
        isDataSet = true;
      }
    }

    if (el['setData'] !== undefined) {
      el.setData(this.data);
      isDataSet = true;
    } else {
      if (el.hasOwnProperty('data')) {
        el.data = this.data;
        isDataSet = true;
      }
    }
    if (!isDataSet) {
      el.setAttribute('data', this.data);
    }

    this.container.nativeElement.appendChild(el);
  }
}
