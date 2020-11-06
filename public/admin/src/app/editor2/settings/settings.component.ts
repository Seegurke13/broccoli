import {Component, Input, OnInit, Output} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Input()
  public values: any = {};
  public settings: any;
  @Input()
  public settingsRef: any;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() { }

  ngOnInit(): void {
  }

  public addClass($event: MatChipInputEvent)
  {
    if (($event.value || '').trim()) {
      if (!this.values.classes) {
        this.values.classes = [];
      }
      this.values.classes.push($event.value.trim());
    }

    if ($event.input) {
      $event.input.value = '';
    }
  }

  public removeClass(className: string): void {
    let index = this.values.classes.indexOf(className);

    if (index >= 0) {
      this.values.classes.splice(index, 1);
    }
  }
}
