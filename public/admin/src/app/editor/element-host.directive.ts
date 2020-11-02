import {Directive, Input, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[elementHost]'
})
export class ElementHostDirective {
  @Input()
  public content: any;

  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
