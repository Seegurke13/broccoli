import {
  Component, HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import {SettingsService} from "../../settings.service";
import {MatDialog} from "@angular/material/dialog";
import {ElementSelectionModalComponent} from "../../element-selection-modal/element-selection-modal.component";
import {PluginElement} from "../../plugin-element";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'div[layout]',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends PluginElement<LayoutComponent> implements OnInit {
  public update;
  public settingsService: SettingsService;
  private dialog: MatDialog;
  @ViewChild('[appElementPlugin]')
  public children;
  @ViewChild(MatMenuTrigger)
  public trigger: MatMenuTrigger;
  @HostListener('document:keydown.a', ['$event'])
  public hotkeyAdd($event) {
    if (!this.isSelected) {
      return;
    }
    this.addChildren();
  }

  @HostListener('document:keydown.d', ['$event'])
  public hotkeyDelete($event) {
    if (!this.isSelected) {
      return;
    }
    this.onDelete.emit({});
  }

  constructor(settingsService: SettingsService, dialog: MatDialog) {
    super();
    this.settingsService = settingsService;
    this.dialog = dialog;
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
        block: 'row'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.values.children.push({
        type: result.type,
        settings: result.settings,
      });
      console.log(this.values.children);
    });
  }

  public removeChildren(i: number) {
    this.values.children.splice(i, 1);
  }
}
