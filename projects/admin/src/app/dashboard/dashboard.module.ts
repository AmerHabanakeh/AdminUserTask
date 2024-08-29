import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'projects/shared/module/Shared.module';
import { PageNotFoundComponent } from './404/page-not-found/page-not-found.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    LayoutComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    TranslateModule,
    SharedModule,
    MatDialogModule,
  ]
})
export class DashboardModule { }
