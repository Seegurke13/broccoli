import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

class DialogData {
  type: string;
}

const presets = [
  {
    type: 'layout',
    block: '',
    data: {},
    label: 'Layout'
  },
  {
    type: 'layout',
    block: '',
    data: {classes: ['row'], children: [{type: 'layout', settings: {classes: ['col'], children: []}}]},
    label: 'Row'
  },
  {
    type: 'layout',
    block: '',
    data: {classes: ['col'], children: []},
    label: 'Col'
  },
  {
    type: 'text',
    block: '',
    data: {text: 'Edit Text'},
    label: 'Text'
  },
  {
    type: 'image',
    block: '',
    data: {'src': '', alt: ''},
    label: 'Image'
  },
  {
    type: 'html',
    block: '',
    data: {html: ''},
    label: 'HTML'
  },
  {
    type: 'iframe',
    block: '',
    data: {src: 'assets/iframe.html'},
    label: 'IFrame'
  }
];

@Component({
  selector: 'app-element-selection-modal',
  templateUrl: './element-selection-modal.component.html',
  styleUrls: ['./element-selection-modal.component.scss']
})
export class ElementSelectionModalComponent {
  public presets: { data: {}; block: string; label: string; type: string }[];

  constructor(
    public dialogRef: MatDialogRef<ElementSelectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.presets = presets;
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
