import {Component, Input, OnInit} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {CssService} from "../css.service";

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

  public cClass = '';
  options: string[] = ['One', 'Two', 'Three'];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private cssService: CssService;

  constructor(cssService: CssService) {
    this.cssService = cssService;
  }

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

  public getFiltered() {
    return this.cssService.getClasses().filter((el) => {
      return el.toLowerCase().includes(this.cClass.toLowerCase());
    });
  }

  public addClassOption(value: any) {
    console.log(value);
  }
}
