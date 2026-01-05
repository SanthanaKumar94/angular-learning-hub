import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  template: `
    <div class="placeholder-container">
      <h2>{{ getSectionName() }} Section</h2>
      <p>This section is coming soon! We'll implement {{ getSectionName().toLowerCase() }} concepts here.</p>
      <div class="coming-soon">
        <h3>What we'll cover:</h3>
        <ul>
          <li>Basic concepts and theory</li>
          <li>Practical examples</li>
          <li>Best practices</li>
          <li>Interactive demos</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .placeholder-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    h2 {
      color: #1976d2;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      color: #666;
    }
    .coming-soon {
      background: #f5f5f5;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: left;
      display: inline-block;
    }
    .coming-soon h3 {
      color: #1976d2;
      margin-bottom: 1rem;
    }
    .coming-soon ul {
      list-style-type: disc;
      padding-left: 1.5rem;
    }
    .coming-soon li {
      margin-bottom: 0.5rem;
    }
  `]
})
export class PlaceholderComponent {
  constructor(private route: ActivatedRoute) {}

  getSectionName(): string {
    const url = this.route.snapshot.url[0]?.path || '';
    return url.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
}