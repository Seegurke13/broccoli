import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-show-modules',
  templateUrl: './show-modules.component.html',
  styleUrls: ['./show-modules.component.scss']
})
export class ShowModulesComponent implements OnInit {
  public modules: any = [
    {
      name: 'Test',
      img: '',
      type: 'text',
      group: 'content',
    },
    {
      img: '',
      name: 'Test 2,',
      type: 'string',
      group: 'extra'
    }
  ];
  private dialogRef: MatDialogRef<ShowModulesComponent>;
  private data: any;

  constructor(dialogRef: MatDialogRef<ShowModulesComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.data = data;
    this.dialogRef = dialogRef;

  }

  ngOnInit(): void {
  }

  public onModuleSelect(module: any) {
    this.dialogRef.close(module);
  }

  public filter(modules: any) {
    return modules.filter((module) => {
      return module.group === this.data.group;
    });
  }
}
