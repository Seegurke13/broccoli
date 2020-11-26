import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-element-selection-modal',
  templateUrl: './element-selection-modal.component.html',
  styleUrls: ['./element-selection-modal.component.scss']
})
export class ElementSelectionModalComponent implements OnInit {
  public presets: any[];

  constructor(
    public dialogRef: MatDialogRef<ElementSelectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.presets = this.data.presets;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  select(layout: string, vars: any = {}) {
    this.dialogRef.close({
      type: layout,
      settings: vars
    });
  }
}
