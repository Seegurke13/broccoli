import { Injectable } from '@angular/core';
import {TreeNode} from "primeng";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getFiles(s: string) {
    return this.http.get<any>('http://localhost/filemodule/files'+s)
      .toPromise()
      .then(res => <TreeNode[]>res);
  }
}
