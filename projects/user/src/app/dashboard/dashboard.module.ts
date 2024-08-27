import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule2 } from '../shared/shared.module';
import { SharedModule } from 'projects/shared/module/Shared.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    SharedModule2,
    SharedModule,
  ]
})
export class DashboardModule { }
