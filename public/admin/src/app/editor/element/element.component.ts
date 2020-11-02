import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef, EventEmitter,
  Input, OnChanges,
  OnInit, Output, SimpleChanges, TemplateRef,
  ViewChild
} from '@angular/core';
import {ElementHostDirective} from "../element-host.directive";
import {MatSelectChange} from "@angular/material/select";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {ElementService} from "../element.service";
import {ElementInterface} from "../element.interface";
import {DefaultComponent} from "../elements/default/default.component";

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit, OnChanges {
  @Input()
  public element;

  @Input()
  public container: string;

  @ViewChild(ElementHostDirective, {static: true})
  public plugin: ElementHostDirective;

  public showSettings: boolean = false;
  public toolbar: TemplateRef<any>;
  public settings: TemplateRef<any>;

  @Output()
  public delete: EventEmitter<any>;

  private componentRef: ComponentRef<any>;
  private elements: any = {};
  private cdr: ChangeDetectorRef;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private es: ElementService;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, cdr: ChangeDetectorRef, elementService: ElementService) {
    this.cdr = cdr;
    this.elements = elementService.getPlugins();
    this.es = elementService;

    this.delete = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.loadElement();
  }

  private loadElement() {
    let plugin = this.es.getPlugins().find((tmp)=>{return tmp.type === this.element.type});
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(plugin ? plugin.component : DefaultComponent);

    const viewContainerRef = this.plugin.viewContainerRef;
    viewContainerRef.clear();

    // @ts-ignore
    const componentRef = viewContainerRef.createComponent<ElementInterface>(componentFactory);

    if (this.element.content === undefined) {
      this.element.content = {};
    }
    componentRef.instance.content = this.element.content;
    componentRef.changeDetectorRef.markForCheck();

    this.componentRef = componentRef;
    this.cdr.detectChanges();
    if (this.componentRef.instance.toolbar) {
      this.toolbar = this.componentRef.instance.toolbar;
    }
    if (this.componentRef.instance.settings) {
      this.settings = this.componentRef.instance.settings;
    }
  }

  public onChangeType($event: MatSelectChange) {
    this.element.type = $event.value;
    this.element.content = {};
    this.loadElement();
  }

  public onDelete() {
    if(!confirm('Delete?')) {
      return;
    }
    this.delete.emit({});
  }

  public onToggleSettings(value: any) {
    this.showSettings = value;
  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.element.properties.classes.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  public remove(className: string): void {
    const index = this.element.properties.classes.indexOf(className);

    if (index >= 0) {
      this.element.properties.classes.splice(index, 1);
    }
  }

  public getPlugins() {
    if (this.container === undefined) {
      return this.es.getPlugins();
    }

    return this.es.getPlugins().filter((el) => {
      return el.container === undefined || el.container.includes(this.container);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.element) {
      if (this.element.type === undefined) {
        this.element.type = 'default';
      }

      if (this.element.content === undefined) {
        this.element.content = {};
      }

      if (this.element.properties === undefined) {
        this.element.properties = {};
      }

      if (this.element.properties.id === undefined) {
        this.element.properties.id = '';
      }

      if (this.element.properties.classes ===undefined) {
        this.element.properties.classes = [];
      }

      this.loadElement();
    }
  }
}
