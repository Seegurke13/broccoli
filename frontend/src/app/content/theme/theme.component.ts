import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  public stylesheets: any[] = [];
  public scripts: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  public deleteStylesheet(i: number) {
    this.stylesheets.splice(i, 1);
  }

  public addStylesheet(value: string) {
    this.stylesheets.push(value);
  }

  public addScript(value: string) {
    this.scripts.push(value);
  }

  public deleteScript(i: number) {
    this.scripts.splice(i, 1);
  }

  public saveTemplate() {

  }
}
