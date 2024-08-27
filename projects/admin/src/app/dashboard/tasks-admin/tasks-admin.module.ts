import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksAdminRoutingModule } from './tasks-admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material/material.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { SharedModule } from "../../../../../shared/module/Shared.module";
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ListTasksComponent,
    AddTaskComponent,
    ConfirmationComponent,
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NgxPaginationModule,
    TasksAdminRoutingModule,
    SharedModule,
    TranslateModule,
]
})
export class TasksAdminModule { }
