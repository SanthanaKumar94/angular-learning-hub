import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <h2>Angular Learning Hub</h2>
      </div>
      <ul class="nav-links">
        <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
        <li><a routerLink="/components" routerLinkActive="active">Components</a></li>
        <li><a routerLink="/data-binding" routerLinkActive="active">Data Binding</a></li>
        <li><a routerLink="/directives" routerLinkActive="active">Directives</a></li>
        <li><a routerLink="/services" routerLinkActive="active">Services</a></li>
        <li><a routerLink="/forms" routerLinkActive="active">Forms</a></li>
        <li><a routerLink="/http" routerLinkActive="active">HTTP</a></li>
      </ul>
    </nav>
  `,
  styles: [`
    .navbar {
      background: #1976d2;
      color: white;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .nav-brand h2 {
      margin: 0;
    }
    .nav-links {
      display: flex;
      list-style: none;
      gap: 1rem;
      margin: 0;
      padding: 0;
    }
    .nav-links a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .nav-links a:hover,
    .nav-links a.active {
      background-color: rgba(255, 255, 255, 0.2);
    }
  `]
})
export class NavigationComponent {}