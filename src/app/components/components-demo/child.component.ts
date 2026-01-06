import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <div class="child-component">
      <h4>Child Component</h4>
      <p>Received from parent: <strong>{{ parentMessage }}</strong></p>
      <p>Child counter: {{ childCounter }}</p>
      
      <button (click)="sendToParent()">Send Message to Parent</button>
      <button (click)="increment()">Increment Counter</button>
      
      <div class="lifecycle-status">
        <p>Lifecycle Status: {{ lifecycleStatus }}</p>
      </div>
    </div>
  `,
  styles: [`
    .child-component {
      border: 2px solid #4caf50;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 8px;
      background: #f1f8e9;
    }
    
    .child-component h4 {
      color: #4caf50;
      margin-top: 0;
    }
    
    .lifecycle-status {
      background: #e8f5e8;
      padding: 0.5rem;
      border-radius: 4px;
      margin-top: 1rem;
    }
    
    button {
      background: #4caf50;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin: 0.25rem;
    }
    
    button:hover {
      background: #45a049;
    }
  `]
})
export class ChildComponent implements OnInit, OnDestroy {
  @Input() parentMessage: string = '';
  @Output() messageToParent = new EventEmitter<string>();
  
  childCounter = 0;
  lifecycleStatus = 'Created';
  
  ngOnInit(): void {
    this.lifecycleStatus = 'Initialized';
    console.log('Child component initialized');
  }
  
  ngOnDestroy(): void {
    this.lifecycleStatus = 'Destroyed';
    console.log('Child component destroyed');
  }
  
  sendToParent(): void {
    this.messageToParent.emit(`Hello from child! Counter: ${this.childCounter}`);
  }
  
  increment(): void {
    this.childCounter++;
  }
}