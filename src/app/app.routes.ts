import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'components', loadComponent: () => import('./components/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
  { path: 'data-binding', loadComponent: () => import('./components/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
  { path: 'directives', loadComponent: () => import('./components/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
  { path: 'services', loadComponent: () => import('./components/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
  { path: 'forms', loadComponent: () => import('./components/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
  { path: 'http', loadComponent: () => import('./components/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
  { path: '**', redirectTo: '' }
];
