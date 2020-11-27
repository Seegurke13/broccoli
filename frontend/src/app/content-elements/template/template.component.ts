import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSelectChange} from "@angular/material/select";
import {PluginElement} from "../../editor2/plugin-element";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ElementSelectionModalComponent} from "../../editor2/element-selection-modal/element-selection-modal.component";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent extends PluginElement<TemplateComponent> {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;

  separatorKeysCodes = [ENTER, COMMA];

  classCtrl = new FormControl();

  @ViewChild('classInput') classInput: ElementRef;

  private http: HttpClient;
  private dialog: MatDialog;

  constructor(http: HttpClient, dialog: MatDialog) {
    super();
    this.http = http;
    this.dialog = dialog;
  }

  public addPlaceholder() {
    if (this.values.placeholder === undefined) {
      this.values.placeholder = [];
    }

    if (this.values.placeholder.find((el) => {return el.name === 'New';})) {
      return;
    }

    this.values.placeholder.push({
      name: 'New'
    });
  }

  public delete(i: number) {
    this.values.placeholder.splice(i, 1);
  }

  public onTemplateChange($event: MatSelectChange) {
    this.values.placeholder = [];
    this.http.get('http://localhost/pagemodule/template/getPlaceholder/'+$event.value).subscribe((placeholders: string[]) => {
      placeholders.forEach((el) => {
        if (this.values.placeholder.find((tmp) => {return el === tmp.name}) === undefined) {
          this.values.placeholder.push({
            name: el
          });
        }
      });
    });
  }

  add(event: MatChipInputEvent): void {
    if (this.values.placeholder === undefined) {
      this.values.placeholder = [];
    }
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.values.placeholder.push({name: value.trim()});
    }

    if (input) {
      input.value = '';
    }

    this.classCtrl.setValue(null);
  }

  remove(className: any): void {
    const index = this.values.placeholder.indexOf(className);

    if (index >= 0) {
      this.values.placeholder.splice(index, 1);
    }
  }

  onAddElement(placeholder: any) {
    let dialogRef = this.dialog.open(ElementSelectionModalComponent, {
      height: '400px',
      width: '600px',
      data: {
        block: 'row'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        placeholder['element'] = JSON.parse(JSON.stringify({
          type: result.type,
          settings: result.settings,
        }));
      }
    });
  }

  ngOnInit(): void {
    if (!this.values.placeholder) {
      this.values.placeholder = [];
    }
  }
}
