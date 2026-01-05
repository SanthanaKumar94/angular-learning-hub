import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-container">
      <h1>Welcome to Angular Learning Hub</h1>
      <p>This project demonstrates various Angular concepts with practical examples.</p>
      
      <div class="learning-sections">
        <div class="section-card">
          <h3>Components</h3>
          <p>Learn about component creation, lifecycle, and communication</p>
        </div>
        <div class="section-card">
          <h3>Data Binding</h3>
          <p>Explore interpolation, property binding, event binding, and two-way binding</p>
        </div>
        <div class="section-card">
          <h3>Directives</h3>
          <p>Built-in and custom directives for DOM manipulation</p>
        </div>
        <div class="section-card">
          <h3>Services</h3>
          <p>Dependency injection and service communication</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      color: #1976d2;
      text-align: center;
      margin-bottom: 1rem;
    }
    p {
      text-align: center;
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }
    .learning-sections {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    .section-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    .section-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    .section-card h3 {
      color: #1976d2;
      margin-bottom: 0.5rem;
    }
  `]
})
export class HomeComponent {}