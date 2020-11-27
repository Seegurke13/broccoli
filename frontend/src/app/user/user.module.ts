import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import {UserRoutingModule} from "./user-routing.module";



@NgModule({
  declarations: [UserComponent, GroupComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
