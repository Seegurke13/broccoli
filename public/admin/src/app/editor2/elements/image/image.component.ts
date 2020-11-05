import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FileModalComponent} from "../../../file/file-modal/file-modal.component";
import {DomSanitizer} from "@angular/platform-browser";
import {ToolbarPlugin} from "../../toolbar-plugin";
import {SettingsPlugin} from "../../settings-plugin";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements ToolbarPlugin, SettingsPlugin {
  @ViewChild('toolbar')
  public toolbar: TemplateRef<any>;
  @ViewChild('settings')
  public settings: TemplateRef<any>;
  @Input()
  public values;

  public preview: any = '';

  private dialog: MatDialog;
  public sanitizer: DomSanitizer;

  constructor(dialog: MatDialog, sanitizer: DomSanitizer) {
    this.dialog = dialog;
    this.sanitizer = sanitizer;
  }

  public selectImage() {
    const dialogRef = this.dialog.open(FileModalComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.values.src = result.filepath;
    });
  }
}
