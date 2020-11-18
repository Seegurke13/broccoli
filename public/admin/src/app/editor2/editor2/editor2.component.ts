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

  @ViewChildren('appElementPlugin')
  public children;

  private http: HttpClient;
  public settings: TemplateRef<any>;
  private settingsService: SettingsService;

  constructor(http: HttpClient, settingsService: SettingsService) {
    this.http = http;
    this.settingsService = settingsService;
  }

  ngOnInit(): void {
  }

  debug() {
    console.log(this.content);
    console.log(JSON.stringify(this.content))
  }
}
