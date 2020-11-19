import {Component, Input, OnInit, TemplateRef, ViewChildren} from '@angular/core';
import {ElementModel} from "../element.model";
import {HttpClient} from "@angular/common/http";
import {SettingsService} from "../settings.service";

@Component({
  selector: 'app-editor2',
  templateUrl: './editor2.component.html',
  styleUrls: ['./editor2.component.scss']
})
export class Editor2Component implements OnInit {
  @Input()
  public content: ElementModel = {
    type: 'template',
    settings: {}
  };

  public toolbar: TemplateRef<any>;

  @ViewChildren('appElementPlugin')
  public children;

  private http: HttpClient;
  public settings: TemplateRef<any>;
  private settingsService: SettingsService;

  constructor(http: HttpClient, settingsService: SettingsService) {
    this.http = http;
    this.settingsService = settingsService;

    settingsService.getObservable().subscribe((toolbar) => {
      if (!this.toolbar
        || toolbar !== undefined
        && toolbar.elementRef !== this.toolbar.elementRef
      ) {
        // this.toolbarOpen = true;
        // this.toolbarEL.open();
      }
      this.toolbar = toolbar;
    });
  }

  ngOnInit(): void {
  }

  debug() {
    console.log(this.content);
    console.log(JSON.stringify(this.content))
  }
}
