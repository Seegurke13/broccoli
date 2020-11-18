import { EventEmitter, HostBinding, HostListener, Input, Output, TemplateRef, ViewChild, Directive } from "@angular/core";
import {SettingsService} from "./settings.service";
import {SelectionService} from "./selection.service";

@Directive()
export abstract class PluginElement<T> {
  @Input()
  public values;

  @ViewChild('settings')
  public settings: TemplateRef<any>;

  public settingsService: SettingsService;

  public selectionService: SelectionService;

  public isSelected: boolean;
  private isHovered: boolean = false;

  @Output()
  public onDelete: EventEmitter<any>;
  @Output()
  public onClick: EventEmitter<any>;

  @HostBinding('class') get class() {
    if (this.values.classes === undefined) {
      return '';
    }
    return this.values.classes.join(' ');
  }

  @HostListener('click', ['$event'])
  public click(event) {
    event.stopPropagation();
    this.settingsService.setSettings(this.settings);
    this.selectionService.emit({});
    this.isSelected = true;
  }

  @HostListener('mouseover', ['$event'])
  public mouseover($event) {
    if ($event['count'] === undefined) {
      $event['count'] = 1;
    } else {
      $event['count']++;
    }
    if ($event['count'] > 1) {
      return;
    }
    if (!this.isHovered) {
      this.isHovered = true;
    }
  }

  @HostListener('mouseout', ['$event'])
  public mouseout() {
    this.isHovered = false;
  }

  @HostBinding('class.admin-element--selected') get selected() { return this.isSelected; }

  @HostBinding('class.admin-element--hover') get hovered() { return this.isHovered; }


  // @HostListener('contextmenu', ['$event'])
  // public contextmenu($event) {
  //   $event.stopPropagation();
  //   $event.preventDefault();
  //
  //   this.onDelete.emit({});
  //
  //   return false;
  // }

  protected constructor() {
    this.onDelete = new EventEmitter<any>();
    this.onClick = new EventEmitter<any>();
  }
}
