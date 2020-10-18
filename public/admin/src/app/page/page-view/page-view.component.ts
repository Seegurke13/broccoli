import {Component, Input, OnInit} from '@angular/core';
import {PageInterface} from "../page.interface";
import {PageBlockInterface} from "../page-block.interface";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ShowModulesComponent} from "../show-modules/show-modules.component";
import {PageExtraInterface} from "../page-extra.interface";

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {
  @Input()
  public pageId: any;

  public page: PageInterface = {
    id: 1,
    name: 'test',
    isDynamic: false,
    template: 'test',
    extra: [
      {
        name: 'test',
        label: 'Test',
        type: 'string',
        data: 'test'
      }
    ],
    content: [
          {
            name: 'test',
            label: 'Inhalt',
            data: 'test',
            type: 'text',
            order: 1,
            placeholder: 'main'
          },
          {
            name: 'test2',
            label: 'Inhalt2',
            data: 'test',
            type: 'test-test',
            placeholder: 'main',
            order: 3
          }
    ]
  }
  public providerValues: string[] = [];
  public placeholders: string[] = [];
  private http: HttpClient;
  private dialog: MatDialog;
  public dataProviders: { name: string; value: string }[] = [];

  constructor(http: HttpClient, dialog: MatDialog) {
    this.http = http;
    this.dialog = dialog;

    this.http.get('http://localhost:80/api/page/getPlaceholder').subscribe((placeholders: string[]) => {
      this.placeholders = placeholders;
    });
  }

  ngOnInit(): void {
  }

  public onChangeTemplate($evt) {
    console.log($evt);
  }

  public isFormFieldType(type: string) {
    return type === 'string' || type === 'number';
  }

  public onProviderChange($evt) {
    this.providerValues = ['name'];
  }

  public sortBy(blocks: PageBlockInterface[]) {
    return blocks.sort((a, b) => {
      return a.order - b.order;
    });
  }

  public isComponent(type: string): boolean {
    return customElements.get(type) !== undefined;
  }

  public getSections(blocks: PageBlockInterface[]) {
    return blocks.map((block: PageBlockInterface) => {return block.placeholder}).filter((v, i, a) => a.indexOf(v) === i);
  }

  public filterBy(content: PageBlockInterface[], placeholder: string) {
    return content.filter((block) => {
      return block.placeholder === placeholder;
    })
  }

  public onDeleteBlock(block: PageBlockInterface) {
    this.page.content.splice(this.page.content.indexOf(block), 1);
  }

  public onAddBlock(placeholder: string) {
    const dialogRef = this.dialog.open(ShowModulesComponent, {
      width: '250px',
      data: {
        group: 'content',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.hasOwnProperty('type')) {
        this.page.content.push({
          placeholder: placeholder,
          label: 'test',
          data: '',
          order: 3,
          type: result.type,
          name: ''
        });
      }
    });
  }

  public onAddExtra() {
    const dialogRef = this.dialog.open(ShowModulesComponent, {
      width: '250px',
      data: {
        group: 'content',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.hasOwnProperty('type')) {
        this.page.extra.push({
          label: 'hmmhmm',
          data: 'test',
          type: 'text',
          name: 'hmm'
        });
        console.log('test', this.page.extra);
      }
    });
  }

  public onDeleteExtra(extra: any) {
    this.page.extra.splice(this.page.extra.indexOf(extra), 1);
  }
}
