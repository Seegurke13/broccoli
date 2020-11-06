import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver, ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {ElementModel} from "../element.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {PluginService} from "../plugin.service";

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: 'auto',
        opacity: 1
      })),
      state('closed', style({
        height: '0',
        opacity: 0,
      })),
      transition('closed <=> open', [
        animate('0.2s')
      ]),
    ]),
  ],
})
export class ElementComponent implements AfterViewInit {
  @Input()
  public element: ElementModel;
  @Output()
  public onDelete: EventEmitter<any>;
  @ViewChild('content', { read: ViewContainerRef})
  public content: ViewContainerRef;

  public showSettings: boolean = false;
  public isOpen: boolean = false;

  public toolbar = null;
  public settings: null;
  public enableChildren: boolean = false;

  private componentFactoryResolver: ComponentFactoryResolver;
  private cdr: ChangeDetectorRef;
  private componentRef: ComponentRef<any>;
  private enableAdd: boolean;
  private pluginService: PluginService;

  constructor(componentFactoryResolver: ComponentFactoryResolver, cdr: ChangeDetectorRef, pluginService: PluginService) {
    this.componentFactoryResolver = componentFactoryResolver;
    this.cdr = cdr;
    this.pluginService = pluginService;

    this.onDelete = new EventEmitter<any>();
  }

  public addChildren($event: any) {
    if (!this.enableChildren) {
      if (this.enableAdd) {
        this.componentRef.instance.add();
      }

      return;
    }

    if (!this.element.children) {
      this.element.children = [];
    }

    this.element.children.push({
      type: '',
      settings: {},
      children: []
    });

    if (this.element.settings.direction === undefined) {
      this.element.settings.direction = true;
    }

    this.isOpen = true;
  }

  public removeChildren(i: number) {
    this.element.children.splice(i, 1);
  }

  public onToggleSettings($event) {
    this.showSettings = !this.showSettings;
  }

  public changeDirection($event: boolean) {
      this.element.settings.direction =  !this.element.settings.direction;
  }

  public changeType($event: string) {
    this.reset();
    this.element.type = $event;
    this.loadElement();
    this.isOpen = true;
  }

  public toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  public ngOnChanges(changes: any): void {
    if (changes.element.currentValue === undefined) {
      this.element.settings = {};
    }

    if (changes.element && (changes.element.isFirstChange() || changes.element.previousValue.type === '') && changes.element.currentValue.type !== '') {
      console.log('test');
      this.loadElement();
    }
  }

  private loadElement() {
    if (!this.element.type || this.element.type === ''|| !this.content) {
      return;
    }

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.pluginService.getComponent(this.element.type));

    this.componentRef = this.content.createComponent<any>(componentFactory)
    this.componentRef.changeDetectorRef.markForCheck();
    this.componentRef.instance.values = this.element.settings;
    this.cdr.detectChanges();

    if (this.componentRef.instance.toolbar) {
      this.toolbar = this.componentRef.instance.toolbar;
    }

    if (this.componentRef.instance.settings) {
      this.settings = this.componentRef.instance.settings;
    }

    if (this.componentRef.instance.enableChildren) {
      this.enableChildren = this.componentRef.instance.enableChildren;
    } else if (this.componentRef.instance.add) {
      this.enableAdd = true;
    }
  }

  public reset() {
    this.element.settings = {};
    this.element.children = [];
    this.element.type = '';
    this.content.clear();
    this.toolbar = null;
    this.settings = null;
    this.enableChildren = false;
    this.enableAdd = false;
  }

  ngAfterViewInit(): void {
    if (this.element.type && this.element.type !== '') {
      this.loadElement();
      this.cdr.detectChanges();
    }
  }
}
