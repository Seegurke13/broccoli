import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FileModalComponent} from "../../../file/file-modal/file-modal.component";
import {DomSanitizer} from "@angular/platform-browser";
import {SettingsService} from "../../settings.service";
import {PluginElement} from "../../plugin-element";

@Component({
  selector: 'div[img]',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent extends PluginElement<ImageComponent> implements OnInit {
  public preview: any = '';

  private dialog: MatDialog;
  public sanitizer: DomSanitizer;

  constructor(dialog: MatDialog, sanitizer: DomSanitizer, settingsService: SettingsService) {
    super();
    this.dialog = dialog;
    this.sanitizer = sanitizer;
    this.settingsService = settingsService;
  }

  ngOnInit(): void {
    if (!this.values.src) {
      this.values.src = '';
    }

    if (!this.values.cClasses) {
      this.values.cClasses = [];
    }
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
