import { Component, ViewChild, ElementRef, OnInit, signal, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from './child.component';

// Base Component for inheritance example
@Directive()
export abstract class BaseComponent implements OnInit {
  componentId = Math.random().toString(36).substr(2, 9);
  createdAt = new Date();
  status = signal('Active');
  
  ngOnInit(): void {
    console.log(`Base component ${this.componentId} initialized`);
  }
  
  updateStatus(): void {
    const statuses = ['Active', 'Inactive', 'Pending', 'Complete'];
    const currentIndex = statuses.indexOf(this.status());
    const nextIndex = (currentIndex + 1) % statuses.length;
    this.status.set(statuses[nextIndex]);
  }
}

@Component({
  selector: 'app-components-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ChildComponent],
  templateUrl: './components-demo.component.html',
  styleUrl: './components-demo.component.scss'
})
export class ComponentsDemoComponent extends BaseComponent {
  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  @ViewChild('colorBox') colorBox!: ElementRef<HTMLDivElement>;
  
  // Component communication
  showChild = true;
  messageToChild = 'Hello from parent!';
  childMessage = '';
  parentCounter = 0;
  
  // ViewChild demo
  inputValue = '';
  
  toggleChild(): void {
    this.showChild = !this.showChild;
  }
  
  onChildMessage(message: string): void {
    this.childMessage = message;
  }
  
  incrementParent(): void {
    this.parentCounter++;
  }
  
  focusInput(): void {
    this.userInput.nativeElement.focus();
  }
  
  getInputValue(): void {
    this.inputValue = this.userInput.nativeElement.value;
  }
  
  changeBoxColor(): void {
    const colors = ['#ff9800', '#4caf50', '#2196f3', '#e91e63', '#9c27b0'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    this.colorBox.nativeElement.style.backgroundColor = randomColor;
  }

  // Code examples
  lifecycleCode = `// Component with lifecycle hooks
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: \`<div>Child Component</div>\`
})
export class ChildComponent implements OnInit, OnDestroy {
  
  ngOnInit(): void {
    console.log('Component initialized');
    // Initialization logic here
  }
  
  ngOnDestroy(): void {
    console.log('Component destroyed');
    // Cleanup logic here
  }
}

// Usage in parent template
<app-child *ngIf="showChild"></app-child>
<button (click)="showChild = !showChild">Toggle Child</button>`;

  communicationCode = `// Parent Component
export class ParentComponent {
  messageToChild = 'Hello from parent!';
  childMessage = '';
  
  onChildMessage(message: string): void {
    this.childMessage = message;
  }
}

// Child Component
export class ChildComponent {
  @Input() parentMessage: string = '';
  @Output() messageToParent = new EventEmitter<string>();
  
  sendToParent(): void {
    this.messageToParent.emit('Hello from child!');
  }
}

// Parent Template
<app-child 
  [parentMessage]="messageToChild"
  (messageToParent)="onChildMessage($event)">
</app-child>

// Child Template
<p>From parent: {{ parentMessage }}</p>
<button (click)="sendToParent()">Send to Parent</button>`;

  viewChildCode = `// Component with ViewChild
export class ComponentsDemoComponent {
  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  @ViewChild('colorBox') colorBox!: ElementRef<HTMLDivElement>;
  
  focusInput(): void {
    this.userInput.nativeElement.focus();
  }
  
  changeBoxColor(): void {
    this.colorBox.nativeElement.style.backgroundColor = 'red';
  }
}

// Template with reference variables
<input #userInput placeholder="Type something">
<button (click)="focusInput()">Focus Input</button>

<div #colorBox class="color-box">Color Box</div>
<button (click)="changeBoxColor()">Change Color</button>`;

  inheritanceCode = `// Base Component
import { Directive, OnInit, signal } from '@angular/core';

@Directive()  // Required for Angular features
export abstract class BaseComponent implements OnInit {
  componentId = Math.random().toString(36).substr(2, 9);
  createdAt = new Date();
  status = signal('Active');
  
  ngOnInit(): void {
    console.log(\`Component \${this.componentId} initialized\`);
  }
  
  updateStatus(): void {
    const statuses = ['Active', 'Inactive', 'Pending'];
    const currentIndex = statuses.indexOf(this.status());
    const nextIndex = (currentIndex + 1) % statuses.length;
    this.status.set(statuses[nextIndex]);
  }
}

// Extended Component
@Component({
  selector: 'app-components-demo',
  standalone: true,
  templateUrl: './components-demo.component.html'
})
export class ComponentsDemoComponent extends BaseComponent {
  // Inherits all properties and methods from BaseComponent
  // Can add additional functionality
  
  additionalMethod(): void {
    // Extended functionality
  }
}`;

  standaloneCode = `// Standalone Component (Modern Angular)
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-standalone',
  standalone: true,  // Key property
  imports: [CommonModule, FormsModule],  // Direct imports
  template: \`
    <div>
      <h3>Standalone Component</h3>
      <input [(ngModel)]="value">
      <p *ngIf="value">Value: {{ value }}</p>
    </div>
  \`
})
export class StandaloneComponent {
  value = '';
}

// No NgModule required!
// Can be used directly in routes or other components`;

  bestPracticesCode = `// Best Practices Example
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-best-practices',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,  // Performance
  template: \`
    <div>
      <h3>{{ title() }}</h3>
      <p>Count: {{ count() }}</p>
    </div>
  \`
})
export class BestPracticesComponent implements OnDestroy {
  // Use signals for reactive state
  title = signal('Best Practices Component');
  count = signal(0);
  
  // Unsubscribe pattern
  private destroy$ = new Subject<void>();
  
  constructor(private dataService: DataService) {
    // Proper subscription management
    this.dataService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        // Handle data
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  // Single responsibility methods
  incrementCount(): void {
    this.count.update(current => current + 1);
  }
}`;
}