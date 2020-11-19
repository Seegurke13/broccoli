import { Pipe } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({name: 'safe'})
export class SafePipe {
  private sanitizer: DomSanitizer;
  constructor(sanitizer:DomSanitizer){
    this.sanitizer = sanitizer;
  }

  transform(value: any, type: string = 'html'): any {
    switch (type)  {
      case "html": {
        return this.sanitizer.bypassSecurityTrustHtml(value);
      }
      case "css": {
        return this.sanitizer.bypassSecurityTrustStyle(value);
      }
      case "url": {
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      }
    }
  }
}
