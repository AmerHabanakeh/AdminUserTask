import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { userGuard } from '../core/guards/user.guard';

const routes: Routes = [
  {

    path: '',
    component: LayoutComponent,
    canActivateChild: [userGuard],
    children: [
      {
        path: 'tasks',
        loadChildren: () => import(`./tasks/tasks.module`).then(m => m.TasksModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
