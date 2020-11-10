import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PluginService} from "../plugin.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output()
  public onDelete: EventEmitter<any>;
  @Input()
  public type: string;
  @Output()
  public onOpenSettings: EventEmitter<any>;
  @Output()
  public onTypeChange: EventEmitter<any>;
  @Output()
  public onOpenToggle: EventEmitter<any>;
  @Input()
  public open: boolean;
  @Input()
  public toolbarRef: any;

  public types: {}[] = [];

  public toolbar;
  public pluginService: PluginService;

  constructor(pluginService: PluginService) {
    this.pluginService = pluginService;

    this.onDelete = new EventEmitter<any>();
    this.onOpenSettings = new EventEmitter<any>();
    this.onTypeChange = new EventEmitter<any>();
    this.onOpenToggle = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.types = this.pluginService.getTypes();
  }

  public delete() {
    this.onDelete.emit({});
  }
}
