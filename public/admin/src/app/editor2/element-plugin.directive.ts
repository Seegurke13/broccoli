import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Directive, ElementRef, EventEmitter,
  Input, OnChanges,
  OnInit, Output, Renderer2, SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import {PluginService} from "./plugin.service";
import {SettingsService} from "./settings.service";
import {SelectionService} from "./selection.service";

@Directive({
  selector: '[appElementPlugin]'
})
export class ElementPluginDirective implements OnInit, OnChanges {
  @Input()
  public element;
  @Output()
  public onDelete: EventEmitter<any>;

  private viewContainerRef: ViewContainerRef;
  private elementRef: ElementRef<void>;

  private componentFactoryResolver: ComponentFactoryResolver;
  private cdr: ChangeDetectorRef;
  private pluginService: PluginService;
  private renderer: Renderer2;
  private readonly settingsService: SettingsService;
  private readonly selectionService: SelectionService;

  constructor(
    elementRef: ElementRef<void>,
    viewContainerRef: ViewContainerRef,
    componentFactoryResolver: ComponentFactoryResolver,
    cdr: ChangeDetectorRef,
    pluginService: PluginService,
    renderer: Renderer2,
    settingsService: SettingsService,
    selectionService: SelectionService
  ) {
    this.elementRef = elementRef;
    this.viewContainerRef = viewContainerRef;
    this.componentFactoryResolver = componentFactoryResolver;
    this.cdr = cdr;
    this.pluginService = pluginService;
    this.renderer = renderer;
    this.settingsService = settingsService;
    this.selectionService = selectionService;
    this.onDelete = new EventEmitter();
  }

  ngOnInit(): void {
    this.loadElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    this.loadElement();
  }

  private loadElement() {
    this.viewContainerRef.clear();

    let comp;
    try {
      comp = this.pluginService.getComponent(this.element.type);
      if (comp === undefined) {
        console.error('component not found!', this.element.type)
        return;
      }
    } catch (e) {
      return;
    }
    let factory = this.componentFactoryResolver.resolveComponentFactory(comp);
    let component = this.viewContainerRef.createComponent(factory);
    // @ts-ignore
    component.instance.onDelete.subscribe(() => {
      this.onDelete.emit({});
    });

    // @ts-ignore
    component.instance.values = this.element.settings;
    // @ts-ignore
    component.instance.type = this.element.type;
    // @ts-ignore
    component.instance.settingsService = this.settingsService;
    // @ts-ignore
    component.instance.selectionService = this.selectionService;

    this.selectionService.getObservable().subscribe(() => {
      // @ts-ignore
      component.instance.isSelected = false;

      // this.cdr.markForCheck();
      // this.cdr.detectChanges();
    });

    this.renderer.addClass(component.location.nativeElement, 'admin-element');

    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }
}
