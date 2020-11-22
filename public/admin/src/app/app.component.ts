import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TestComponent} from "./test/test.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin';
  private router: Router;
  private http: HttpClient;

  constructor(router: Router, http: HttpClient) {
    this.router = router;
    this.http = http;
  }
}
