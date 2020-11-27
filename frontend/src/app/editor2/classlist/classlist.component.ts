import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html',
  styleUrls: ['./classlist.component.scss']
})
export class ClasslistComponent {
  @Input()
  public classes: any = [];
  @Input()
  public label: string = '';
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;

  @Output()
  public change: EventEmitter<any>;

  separatorKeysCodes = [ENTER, COMMA];

  classCtrl = new FormControl();

  filteredClasses: Observable<any[]>;

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
    if (this.classes === undefined) {
      this.classes = [];
    }
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.classes.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.classCtrl.setValue(null);
    this.change.emit({});
  }

  remove(className: any): void {
    const index = this.classes.indexOf(className);

    if (index >= 0) {
      this.classes.splice(index, 1);
    }

    this.change.emit({});
  }

  filter(name: string) {
    return this.allClasses.filter(fruit =>
      fruit.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.classes === undefined) {
      this.classes = [];
    }

    this.classes.push(event.option.viewValue);
    this.classInput.nativeElement.value = '';
    this.classCtrl.setValue(null);
  }
}
