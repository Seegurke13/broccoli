import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

customElements.define('test-test', class extends HTMLElement {
  constructor() {
    super();
    let template = document.createElement('template');
    template.innerHTML = "<div>HELLO</div>";
    let templateContent = template.content;

    const shadowRoot = this.attachShadow({mode: 'open'})
      .appendChild(templateContent.cloneNode(true));

    this.shadowRoot.innerHTML = 'geil';
  }

  public setValue(val) {

    this.shadowRoot.innerHTML = 'geil' + val;
    console.log('test');
  }

  public getValue() {
    return "hmm";
  }
});
console.log('registred!');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
