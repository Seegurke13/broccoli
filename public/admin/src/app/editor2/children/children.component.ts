import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ElementModel} from "../element.model";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})
export class ChildrenComponent implements OnInit {
  @Output()
  public onDeleteChild: EventEmitter<any>;

  @Input()
  public direction: any;

  @Input()
  public children: ElementModel[] = [];

  constructor() {
    this.onDeleteChild = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }
}
