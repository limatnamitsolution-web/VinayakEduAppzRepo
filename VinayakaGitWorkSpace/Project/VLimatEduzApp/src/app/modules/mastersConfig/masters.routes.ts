// app/modules/student/student.routes.ts
import { Routes } from '@angular/router';
import { MastersConfigLayoutComponent } from './masters-config-layout-component';
import { MastersConfigDashboardComponent } from './masters-config-dashboard-component';
export const mastersConfigRoutes: Routes = [
  {
    path: '',
    component: MastersConfigLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        loadComponent: () => import('./masters-config-dashboard-component').then(c => c.MastersConfigDashboardComponent)
      }
      // Add other student routes here
    ]
  }
];