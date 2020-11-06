import {Component, Inject, Injectable} from '@angular/core';
import {TreeNode} from "primeng";
import {FileService} from "../file.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

/**
 * @title Tree with dynamic data
 */
@Component({
  selector: 'app-file-modal',
  templateUrl: 'file-modal.component.html',
  styleUrls: ['file-modal.component.scss']
})
export class FileModalComponent {
  files: TreeNode[];
  private nodeService: FileService;
  private dialogRef: MatDialogRef<FileModalComponent>;
  @Inject(MAT_DIALOG_DATA) private data: any;

  loading: boolean;

  private types = ['jpg', 'png'];

  constructor(
    nodeService: FileService,
    dialogRef: MatDialogRef<FileModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.nodeService = nodeService;
    this.dialogRef = dialogRef;
    this.data = data;

  }

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.nodeService.getFiles('/').then((nodes) => {
        nodes = nodes.filter((node: any) => {
          return node.type === 'dir' || this.types.includes(node.ext);
        });
        this.files = nodes.map((node) => {
          node['leaf'] = true;
          if (node['type'] === 'dir') {
            node["expandedIcon"] = "pi pi-folder-open";
            node["collapsedIcon"] = "pi pi-folder";
            node["leaf"] = false;
          }

          return node;
        });
      });
      this.loading = false;
    }, 1000);
  }

  nodeExpand(event) {
    if (event.node && event.node.type === 'dir') {
      this.nodeService.getFiles('/' + event.node.path + event.node.label + '/').then(nodes => {
        nodes = nodes.filter((node: any) => {
          return node.type === 'dir' || this.types.includes(node.ext);
        });
        event.node.children = nodes.map((node) => {
          if (node['type'] === 'dir') {
            node["expandedIcon"] = "pi pi-folder-open";
            node["collapsedIcon"] = "pi pi-folder";
          }
          node["leaf"] = false;

          return node;
        });
      });
    }
  }

  nodeSelect(event) {
    if (event.node.type === 'file' && this.types.includes(event.node.ext)) {
      this.dialogRef.close({
        filepath: event.node.path + event.node.label
      })
    }
  }
}
