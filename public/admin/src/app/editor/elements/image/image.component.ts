import {Component, Input, ViewChild} from '@angular/core';
import {ElementInterface} from "../../element.interface";
import {MatDialog} from "@angular/material/dialog";
import {FileModalComponent} from "../../../file/file-modal/file-modal.component";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements ElementInterface {
  @Input()
  public content: any = {src: '', alt: ''};
  @Input()
  public properties: any;
  @Input()
  public type: string;
  @ViewChild('toolbar')
  public toolbar;
  @ViewChild('settings')
  public settings;

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
      this.content.src = result.filepath;
    });
  }
}
