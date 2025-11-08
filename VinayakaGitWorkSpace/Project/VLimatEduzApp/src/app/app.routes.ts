// app/app.routes.ts
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout-component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'student', pathMatch: 'full' },
      { 
        path: 'student', 
        loadChildren: () => import('./modules/student/student.routes').then(m => m.StudentRoutes)
      }
      // Add other module routes here
    ]
  }
];