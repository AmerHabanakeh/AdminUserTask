import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'projects/shared/module/Shared.module';


@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    TranslateModule,
    SharedModule,
  ]
})
export class DashboardModule { }
