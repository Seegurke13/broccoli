import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef, EventEmitter,
  Input,
  OnInit, Output, TemplateRef,
  ViewChild
} from '@angular/core';
import {ElementHostDirective} from "../element-host.directive";
import {ElementModel} from "../element.model";
import {LayoutComponent} from "../elements/layout/layout.component";
import {TextComponent} from "../elements/text/text.component";
import {MatSelectChange} from "@angular/material/select";
import {DefaultComponent} from "../elements/default/default.component";
import {ImageComponent} from "../elements/image/image.component";
import {DataProviderComponent} from "../data-provider/data-provider.component";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {
  @Input()
  public type: string;
  @Input()
  public properties: any;
  @Input()
  public content: any[];
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

  constructor(private componentFactoryResolver: ComponentFactoryResolver, cdr: ChangeDetectorRef) {
    this.cdr = cdr;
    this.elements = {
      text: new ElementModel(TextComponent, [], []),
      layout: new ElementModel(LayoutComponent, [], []),
      default: new ElementModel(DefaultComponent, [], []),
      provider: new ElementModel(DataProviderComponent, [], []),
      image: new ElementModel(ImageComponent, [], []),
    };

    this.delete = new EventEmitter<any>();
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

    const componentRef = viewContainerRef.createComponent<any>(componentFactory);

    componentRef.instance.content = this.content;
    componentRef.instance.properties = this.properties;

    this.componentRef = componentRef;
    this.cdr.detectChanges();
    if (this.componentRef.instance.toolbar) {
      this.toolbar = this.componentRef.instance.toolbar;
    }
    if (this.componentRef.instance.settings) {
      this.settings = this.componentRef.instance.settings;
    }
  }

  public onAction(action: string, params = []) {
    this.componentRef.instance[action](...params);
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
