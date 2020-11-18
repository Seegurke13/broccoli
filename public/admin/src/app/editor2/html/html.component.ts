import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss']
})
export class HtmlComponent {
  @Input()
  values: any = {};
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;

  @Output()
  public change: EventEmitter<any>;

  separatorKeysCodes = [ENTER, COMMA];

  classCtrl = new FormControl();

  filteredClasses: Observable<any[]>;

  classes = [
    'Lemon',
  ];

  allClasses = [
    'Apple',
    'Lemon',
    'Lime',
    'Orange',
    'Strawberry'
  ];

  @ViewChild('classInput') classInput: ElementRef;

  constructor() {
    this.filteredClasses = this.classCtrl.valueChanges.pipe(
      startWith(null),
      map((className: string | null) => className ? this.filter(className) : this.allClasses.slice()));

    this.change = new EventEmitter<any>();
  }

  add(event: MatChipInputEvent): void {
    if (this.values.classes === undefined) {
      this.values.classes = [];
    }
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.values.classes.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.classCtrl.setValue(null);
    this.change.emit({});
  }

  remove(className: any): void {
    const index = this.values.classes.indexOf(className);

    if (index >= 0) {
      this.values.classes.splice(index, 1);
    }

    this.change.emit({});
  }

  filter(name: string) {
    return this.allClasses.filter(fruit =>
      fruit.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.values.classes === undefined) {
      this.values.classes = [];
    }

    this.values.classes.push(event.option.viewValue);
    this.classInput.nativeElement.value = '';
    this.classCtrl.setValue(null);
  }
}
