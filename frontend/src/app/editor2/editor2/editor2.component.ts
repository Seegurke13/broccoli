import {Component, EventEmitter, Input, Output, TemplateRef, ViewChildren} from '@angular/core';
import {ElementModel} from "../element.model";
import {HttpClient} from "@angular/common/http";
import {ElementSelectionModalComponent} from "../element-selection-modal/element-selection-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {PluginService} from "../plugin.service";
import {SettingsService} from "../settings.service";
import {AppModuleService} from "../../app-module.service";

@Component({
  selector: 'app-editor2',
  templateUrl: './editor2.component.html',
  styleUrls: ['./editor2.component.scss'],
  providers: [{ provide: PluginService}]
})
export class Editor2Component {
  @Input()
  public content: ElementModel;

  @ViewChildren('appElementPlugin')
  public children;

  @Input()
  public root = null;

  public _config: {
    types: {
      template: '',
      text: '',
    }
  }

  @Output()
  public settings: EventEmitter<TemplateRef<any>>;

  private http: HttpClient;
  private dialog: MatDialog;
  private pluginService: PluginService;
  private settingsService: SettingsService;
  private moduleService: AppModuleService;

  constructor(http: HttpClient, dialog: MatDialog, pluginService: PluginService, settingsService: SettingsService, moduleService: AppModuleService) {
    this.http = http;
    this.dialog = dialog;
    this.pluginService = pluginService;
    this.settingsService = settingsService;
    this.moduleService = moduleService;

    this.settings = new EventEmitter<TemplateRef<any>>();
    this.settingsService.getObservable().subscribe((template) => {
      this.settings.emit(template);
    });
  }

  @Input()
  set config(config: any) {
      console.log(config);
      Promise.all(Object.keys(config.types).map((key) => {
        return new Promise((resolve) => {
          this.moduleService.loadModule(config.types[key].split('!')[0]).then((module: any) => {
            resolve({
              type: key,
              component: module.components[config.types[key].split('!')[1]].type,
              block: ''
            });
          });
        })
      })).then((types: any) => {
        this.pluginService.setPresets(types);
      });
  }

  debug() {
    console.log(this.content);
    console.log(JSON.stringify(this.content))
  }

  public addElement() {
    let dialogRef = this.dialog.open(ElementSelectionModalComponent, {
      height: '400px',
      width: '600px',
      data: {
        presets: this.pluginService.getPresets(this.root ? [this.root] : null)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.content = JSON.parse(JSON.stringify({
          type: result.type,
          settings: result.settings,
        }));
      }
    });
  }
}
