import { Component, OnInit } from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {HttpClient} from "@angular/common/http";
import {element} from "protractor";

@Component({
  selector: 'app-static-fields',
  templateUrl: './static-fields.component.html',
  styleUrls: ['./static-fields.component.scss']
})
export class StaticFieldsComponent implements OnInit {
  public field: any = {
    id: 1,
    name: 'Test',
    element: {
      type: 'text',
      settings: {}
    }
  };

  public fields = [
    {
      id: 1,
      name: 'Test',
      element: {
        type: 'text',
        settings: {}
      }
    }
  ]
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  ngOnInit(): void {
    this.reload();
  }

  public changeType($event: MatSelectChange) {
    this.field.element = {
      type: $event.value,
      settings: {}
    };
  }

  public delete() {
    this.http.delete('http://localhost/pagemodule/field/' + this.field.id).subscribe(() => {
      this.fields.splice(this.field.id, 1);
      this.field = null;
    });
  }

  public save() {
    if (!this.field.id) {
      this.http.post('http://localhost/pagemodule/field', this.field).subscribe(() => {
        this.fields.push(this.field);
      });
    } else {
      this.http.put('http://localhost/pagemodule/field/' + this.field.id, this.field).subscribe(() => {
        // this.fields.push(this.field);
      });
    }
  }

  public reload() {
    this.http.get('http://localhost/pagemodule/field').subscribe((data: any[]) => {
      this.fields = data;
    });
  }

  public add() {
    this.field = {
      name: 'new Field',
      element: {
        type: '',
        settings: {}
      }
    }
  }
}
