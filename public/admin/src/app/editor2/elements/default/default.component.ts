import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  @HostBinding('style') get style() {
    return 'position: absolute; right: 0; top: 0;';
  }

  @Output()
  public onDelete: EventEmitter<any>;

  constructor() {
    this.onDelete = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }
}
