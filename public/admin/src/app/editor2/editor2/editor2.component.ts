import {Component, Input, TemplateRef, ViewChildren} from '@angular/core';
import {ElementModel} from "../element.model";
import {HttpClient} from "@angular/common/http";
import {ElementSelectionModalComponent} from "../element-selection-modal/element-selection-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {PluginService} from "../plugin.service";

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

  private http: HttpClient;
  public settings: TemplateRef<any>;
  private dialog: MatDialog;
  private pluginService: PluginService;

  constructor(http: HttpClient, dialog: MatDialog, pluginService: PluginService) {
    this.http = http;
    this.dialog = dialog;
    this.pluginService = pluginService;
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
