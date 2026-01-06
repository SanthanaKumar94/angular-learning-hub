import { Component, ViewChild, ContentChild, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { LifecycleChildComponent } from './lifecycle-child.component';

@Component({
  selector: 'app-lifecycle-wrapper',
  standalone: true,
  imports: [LifecycleChildComponent],
  template: `
    <div class="wrapper-container">
      <h4>Lifecycle Wrapper (Parent)</h4>
      <p>This component demonstrates Content vs View hooks</p>
      
      <!-- This is the CONTENT (projected into child) -->
      <app-lifecycle-child 
        [inputValue]="inputValue"
        [counter]="counter"
        (hookExecuted)="onHookExecuted($event)">
        
        <!-- PROJECTED CONTENT (ng-content) -->
        <div class="projected-content">
          <h5>📦 Projected Content</h5>
          <p>This content is projected into the child component</p>
          <p>Content hooks fire when this is initialized/checked</p>
          <button #projectedButton (click)="onProjectedClick()">Projected Button</button>
        </div>
        
      </app-lifecycle-child>
      
      <!-- This is the VIEW (child component) -->
      <div class="view-content">
        <h5>👁️ View Content</h5>
        <p>This is part of the wrapper's view</p>
        <button #viewButton (click)="onViewClick()">View Button</button>
      </div>
    </div>
  `,
  styles: [`
    .wrapper-container {
      border: 3px solid #ff9800;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 8px;
      background: #fff3e0;
    }
    
    .wrapper-container h4 {
      color: #ff9800;
      margin-top: 0;
    }
    
    .projected-content {
      background: #e8f5e9;
      border: 2px dashed #4caf50;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 8px;
    }
    
    .projected-content h5 {
      color: #4caf50;
      margin-top: 0;
    }
    
    .view-content {
      background: #e3f2fd;
      border: 2px dashed #2196f3;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 8px;
    }
    
    .view-content h5 {
      color: #2196f3;
      margin-top: 0;
    }
    
    button {
      background: #1976d2;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin: 0.25rem;
    }
  `]
})
export class LifecycleWrapperComponent implements AfterViewInit, AfterContentInit {
  @ViewChild('viewButton') viewButton!: ElementRef<HTMLButtonElement>;
  @ContentChild('projectedButton') projectedButton!: ElementRef<HTMLButtonElement>;
  
  inputValue = 'Initial value';
  counter = 0;
  
  ngAfterContentInit(): void {
    console.log('🔄 WRAPPER: ngAfterContentInit - Projected content is now available');
    // projectedButton is NOT available here (it's in child's content)
  }
  
  ngAfterViewInit(): void {
    console.log('👁️ WRAPPER: ngAfterViewInit - View is now available');
    console.log('View button available:', !!this.viewButton);
  }
  
  onHookExecuted(event: any): void {
    // Forward to parent
  }
  
  onProjectedClick(): void {
    console.log('📦 Projected content button clicked');
  }
  
  onViewClick(): void {
    console.log('👁️ View content button clicked');
  }
}