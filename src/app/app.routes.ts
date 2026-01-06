import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { ComponentsHubComponent } from './components/components-demo/components-hub.component';
import { LifecycleComponent } from './components/components-demo/lifecycle/lifecycle.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'components', component: ComponentsHubComponent },
  { path: 'components/lifecycle', component: LifecycleComponent },
  { path: 'data-binding', component: DataBindingComponent },
  { path: 'directives', loadComponent: () => import('./components/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
  { path: 'services', loadComponent: () => import('./components/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
  { path: 'forms', loadComponent: () => import('./components/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
  { path: 'http', loadComponent: () => import('./components/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
  { path: '**', redirectTo: '' }
];
