import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.scss'
})
export class LifecycleComponent {

  lifecycleCodeExample = `import { 
  Component, 
  OnInit, 
  OnDestroy, 
  OnChanges, 
  AfterViewInit,
  AfterViewChecked,
  AfterContentInit,
  AfterContentChecked,
  DoCheck,
  SimpleChanges,
  Input
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-lifecycle-demo',
  template: \`
    <div>
      <h3>Lifecycle Demo Component</h3>
      <p>Input value: {{ inputValue }}</p>
      <p>Component ID: {{ componentId }}</p>
    </div>
  \`
})
export class LifecycleDemoComponent implements 
  OnInit, OnDestroy, OnChanges, AfterViewInit, 
  AfterViewChecked, AfterContentInit, AfterContentChecked, DoCheck {
  
  @Input() inputValue: string = '';
  
  componentId = Math.random().toString(36).substr(2, 9);
  private destroy$ = new Subject<void>();
  
  // 1. Constructor - Basic initialization
  constructor() {
    console.log('1. Constructor called');
  }
  
  // 2. OnChanges - Input property changes
  ngOnChanges(changes: SimpleChanges): void {
    console.log('2. ngOnChanges called', changes);
    
    if (changes['inputValue']) {
      const change = changes['inputValue'];
      console.log(\`Input changed from \${change.previousValue} to \${change.currentValue}\`);
    }
  }
  
  // 3. OnInit - Component initialization
  ngOnInit(): void {
    console.log('3. ngOnInit called');
    
    // Perfect place for:
    // - API calls
    // - Setting up subscriptions
    // - Complex initialization logic
    
    this.setupSubscriptions();
  }
  
  // 4. DoCheck - Custom change detection
  ngDoCheck(): void {
    console.log('4. ngDoCheck called');
    
    // Use sparingly - called frequently!
    // Custom change detection logic here
  }
  
  // 5. AfterContentInit - Content projection initialized
  ngAfterContentInit(): void {
    console.log('5. ngAfterContentInit called');
    
    // Content (ng-content) is now available
  }
  
  // 6. AfterContentChecked - Content checked
  ngAfterContentChecked(): void {
    console.log('6. ngAfterContentChecked called');
    
    // Called after every change detection cycle
  }
  
  // 7. AfterViewInit - View initialized
  ngAfterViewInit(): void {
    console.log('7. ngAfterViewInit called');
    
    // Perfect place for:
    // - ViewChild access
    // - DOM manipulation
    // - Third-party library initialization
  }
  
  // 8. AfterViewChecked - View checked
  ngAfterViewChecked(): void {
    console.log('8. ngAfterViewChecked called');
    
    // Called after every change detection cycle
    // Be careful with heavy operations here
  }
  
  // 9. OnDestroy - Cleanup
  ngOnDestroy(): void {
    console.log('9. ngOnDestroy called');
    
    // Critical for preventing memory leaks:
    this.destroy$.next();
    this.destroy$.complete();
    
    // Also cleanup:
    // - Event listeners
    // - Timers/intervals
    // - Manual subscriptions
  }
  
  private setupSubscriptions(): void {
    // Example of proper subscription management
    someObservable$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        // Handle data
      });
  }
}

// Usage in template:
// <app-lifecycle-demo [inputValue]="someValue"></app-lifecycle-demo>`;
}