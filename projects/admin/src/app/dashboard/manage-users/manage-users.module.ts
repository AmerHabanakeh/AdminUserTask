import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'projects/shared/module/Shared.module';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ManageUsersRoutingModule,
    HttpClientModule,
    CommonModule,
    TranslateModule,
    SharedModule,
    NgxPaginationModule,
  ]
})
export class ManageUsersModule { }
