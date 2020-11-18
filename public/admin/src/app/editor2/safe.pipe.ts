import { Pipe } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({name: 'safe'})
export class SafePipe {
  private sanitizer: DomSanitizer;
  constructor(sanitizer:DomSanitizer){
    this.sanitizer = sanitizer;
  }

  transform(value: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
