import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('toolbar')
  public toolbar: TemplateRef<any>;
  @ViewChild('settings')
  public settings;
  @Input()
  public values;

  public enableChildren = true;

  constructor() { }

  ngOnInit(): void {
  }

  public addChildren() {
    if (!this.values.children) {
      this.values.children = [];
    }

    this.values.children.push({
      type: '',
      settings: {},
    });
  }

  public removeChildren(i: number) {
    this.values.children.splice(i, 1);
  }

  public changeDirection($event: boolean) {
    this.values.direction =  !this.values.direction;
  }
}
