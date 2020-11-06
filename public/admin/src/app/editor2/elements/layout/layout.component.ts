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
}
