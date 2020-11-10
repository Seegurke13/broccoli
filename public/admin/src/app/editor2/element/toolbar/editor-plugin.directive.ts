import {Directive, Input, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[elementHost]'
})
export class EditorPluginDirective {
  @Input()
  public settings: any;

  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
