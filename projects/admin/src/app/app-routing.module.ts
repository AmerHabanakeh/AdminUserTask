import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './dashboard/404/page-not-found/page-not-found.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: "full",
  },
  {
    path: '',
    loadChildren: () => import(`./dashboard/dashboard.module`).then(m => m.DashboardModule)
  },

  {
    path: 'login',
    loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks',
  },
  { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
