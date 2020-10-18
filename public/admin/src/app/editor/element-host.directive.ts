import {Directive, Input, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[elementHost]'
})
export class ElementHostDirective {
  @Input()
  public type: string;
  @Input()
  public content: any[]|any;
  @Input()
  public properties: any;

  constructor(public viewContainerRef: ViewContainerRef) {

  }
}
