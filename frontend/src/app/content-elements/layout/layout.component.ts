import {
  Component, HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import {SettingsService} from "../../editor2/settings.service";
import {MatDialog} from "@angular/material/dialog";
import {ElementSelectionModalComponent} from "../../editor2/element-selection-modal/element-selection-modal.component";
import {PluginElement} from "../../editor2/plugin-element";
import {MatMenuTrigger} from "@angular/material/menu";
import {PluginService} from "../../editor2/plugin.service";

@Component({
  selector: 'div[layout]',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends PluginElement<LayoutComponent> implements OnInit {
  public settingsService: SettingsService;
  private dialog: MatDialog;

  @ViewChild('[appElementPlugin]')
  public children;
  @ViewChild(MatMenuTrigger)
  public trigger: MatMenuTrigger;
  private pluginService: PluginService;

  @HostListener('document:keydown.control.a', ['$event'])
  public hotkeyAdd() {
    if (!this.isSelected) {
      return;
    }
    this.addChildren();
  }

  @HostListener('document:keydown.control.d', ['$event'])
  public hotkeyDelete() {
    if (!this.isSelected) {
      return;
    }
    this.onDelete.emit({});
  }

  constructor(settingsService: SettingsService, dialog: MatDialog, pluginService: PluginService) {
    super();
    this.settingsService = settingsService;
    this.dialog = dialog;
    this.pluginService = pluginService;
  }

  ngOnInit(): void {
    if (!this.values.children) {
      this.values.children = [];
    }

    if (!this.values.classes) {
      this.values.classes = [];
    }

    if (!this.values.styles) {
      this.values.styles = {};
    }
  }

  public addChildren() {
    if (!this.values.children) {
      this.values.children = [];
    }

    let dialogRef = this.dialog.open(ElementSelectionModalComponent, {
      height: '400px',
      width: '600px',
      data: {
        presets: this.pluginService.getPresets()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.values.children.push(JSON.parse(JSON.stringify({
          type: result.type,
          settings: result.settings,
        })));
      }
    });
  }

  public removeChildren(i: number) {
    this.values.children.splice(i, 1);
  }
}
