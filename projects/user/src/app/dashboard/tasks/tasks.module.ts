import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule2 } from '../../shared/shared.module';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { SharedModule } from 'projects/shared/module/Shared.module';


@NgModule({
  declarations: [
    ListTasksComponent,
    TaskDetailsComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    CommonModule,
    TasksRoutingModule,
    SharedModule2,
    SharedModule,
  ]
})
export class TasksModule { }
