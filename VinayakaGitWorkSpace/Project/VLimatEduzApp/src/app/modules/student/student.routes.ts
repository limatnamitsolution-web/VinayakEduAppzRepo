// app/modules/student/student.routes.ts
import { Routes } from '@angular/router';
import { StudentLayoutComponent } from './student-layout-component';
import { StudentDashboardComponent } from './student-dashboard-component';
export const StudentRoutes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        loadComponent: () => import('./student-dashboard-component').then(c => c.StudentDashboardComponent)
      }
      // Add other student routes here
    ]
  }
];