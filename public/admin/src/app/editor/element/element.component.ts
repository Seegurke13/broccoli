import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef, EventEmitter,
  Input,
  OnInit, Output, TemplateRef,
  ViewChild
} from '@angular/core';
import {ElementHostDirective} from "../element-host.directive";
import {MatSelectChange} from "@angular/material/select";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {ElementService} from "../element.service";
import {ElementInterface} from "../element.interface";

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {
  @Input()
  public type: string;
  @Output()
  public typeChange: EventEmitter<string>;
  @Input()
  public properties: any;
  @Input()
  public content: any;
  @ViewChild(ElementHostDirective, {static: true})
  public element: ElementHostDirective;

  public toolbar: TemplateRef<any>;
  public settings: TemplateRef<any>;
  @Output()
  public delete: EventEmitter<any>;

  private componentRef: ComponentRef<any>;

  private elements: any = {};
  private cdr: ChangeDetectorRef;
  public showSettings: boolean = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private componentFactoryResolver: ComponentFactoryResolver, cdr: ChangeDetectorRef, elementService: ElementService) {
    this.cdr = cdr;
    this.elements = elementService.getPlugins();

    this.delete = new EventEmitter<any>();
    this.typeChange = new EventEmitter<string>();
  }

  ngOnInit(): void {
    if (this.properties === undefined) {
      this.properties = {};
    }
    if (this.properties.classes === undefined) {
      this.properties.classes = [];
    }
    this.loadElement();
  }

  private loadElement() {
    if (!Object.getOwnPropertyNames(this.elements).find((el) => {
      return el === this.type;
    })) {
      this.type = 'default';
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.elements[this.type].getComponent());

    const viewContainerRef = this.element.viewContainerRef;
    viewContainerRef.clear();

    // @ts-ignore
    const componentRef = viewContainerRef.createComponent<ElementInterface>(componentFactory);

    componentRef.instance.content = this.content;
    if (componentRef.instance.properties) {
      componentRef.instance.properties = this.properties;
    }

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
    this.type = $event.value;
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
      this.properties.classes.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  public remove(className: string): void {
    const index = this.properties.classes.indexOf(className);

    if (index >= 0) {
      this.properties.classes.splice(index, 1);
    }
  }
}
