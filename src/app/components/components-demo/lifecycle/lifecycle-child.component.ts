import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  OnInit, 
  OnDestroy, 
  OnChanges, 
  AfterViewInit,
  AfterViewChecked,
  AfterContentInit,
  AfterContentChecked,
  DoCheck,
  SimpleChanges,
  ViewChild,
  ContentChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-lifecycle-child',
  standalone: true,
  template: `
    <div class="lifecycle-child">
      <h4>Lifecycle Demo Child Component</h4>
      <p><strong>Input Value:</strong> {{ inputValue }}</p>
      <p><strong>Counter:</strong> {{ counter }}</p>
      <p><strong>Component ID:</strong> {{ componentId }}</p>
      <p><strong>Status:</strong> {{ status }}</p>
      
      <!-- PROJECTED CONTENT SLOT -->
      <div class="content-section">
        <h5>📦 Content Projection Area:</h5>
        <div class="content-slot">
          <ng-content></ng-content>
        </div>
      </div>
      
      <!-- CHILD VIEW ELEMENTS -->
      <div class="view-section">
        <h5>👁️ Child View Elements:</h5>
        <input #childInput placeholder="Child input element" (input)="onChildInput($event)">
        <button #childButton (click)="onChildButtonClick()">Child Button</button>
        <p>Child input value: {{ childInputValue }}</p>
      </div>
      
      <div class="hook-status">
        <h5>Hooks Executed:</h5>
        <div class="hooks-grid">
          <span *ngFor="let hook of allHooks" 
                [class.executed]="executedHooks.includes(hook)"
                class="hook-badge">
            {{ hook }}
          </span>
        </div>
      </div>
      
      <div class="cycle-info">
        <p><small>DoCheck: {{ doCheckCount }} | ViewChecked: {{ viewCheckedCount }} | ContentChecked: {{ contentCheckedCount }}</small></p>
      </div>
      
      <div class="access-info">
        <h5>Element Access Status:</h5>
        <p><strong>ViewChild (childInput):</strong> {{ viewChildStatus }}</p>
        <p><strong>ContentChild (projected):</strong> {{ contentChildStatus }}</p>
      </div>
    </div>
  `,
  styles: [`
    .lifecycle-child {
      background: #e3f2fd;
      border: 2px solid #1976d2;
      border-radius: 8px;
      padding: 1.5rem;
      width: 100%;
    }
    
    .lifecycle-child h4 {
      color: #1976d2;
      margin-top: 0;
    }
    
    .content-section {
      margin: 1rem 0;
    }
    
    .content-section h5 {
      color: #4caf50;
      margin-bottom: 0.5rem;
    }
    
    .content-slot {
      min-height: 50px;
      border: 2px dashed #4caf50;
      border-radius: 8px;
      padding: 1rem;
      background: #f1f8e9;
    }
    
    .view-section {
      margin: 1rem 0;
      padding: 1rem;
      background: #e8f4fd;
      border: 2px dashed #2196f3;
      border-radius: 8px;
    }
    
    .view-section h5 {
      color: #2196f3;
      margin-top: 0;
    }
    
    .hook-status {
      margin-top: 1rem;
    }
    
    .hook-status h5 {
      color: #1976d2;
      margin-bottom: 0.5rem;
    }
    
    .hooks-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .hook-badge {
      background: #f5f5f5;
      color: #666;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      border: 1px solid #ddd;
    }
    
    .hook-badge.executed {
      background: #4caf50;
      color: white;
      border-color: #4caf50;
    }
    
    .cycle-info {
      margin-top: 1rem;
      padding: 0.5rem;
      background: #fff3e0;
      border-radius: 4px;
    }
    
    .cycle-info small {
      color: #f57c00;
    }
    
    .access-info {
      margin-top: 1rem;
      padding: 0.5rem;
      background: #f3e5f5;
      border-radius: 4px;
    }
    
    .access-info h5 {
      color: #9c27b0;
      margin-top: 0;
    }
    
    input, button {
      margin: 0.25rem;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    button {
      background: #1976d2;
      color: white;
      border: none;
      cursor: pointer;
    }
  `]
})
export class LifecycleChildComponent implements 
  OnInit, OnDestroy, OnChanges, AfterViewInit, 
  AfterViewChecked, AfterContentInit, AfterContentChecked, DoCheck {
  
  @Input() inputValue: string = '';
  @Input() counter: number = 0;
  @Output() hookExecuted = new EventEmitter<{hook: string, message: string, type: 'init' | 'change' | 'destroy'}>();
  
  // ViewChild - accesses elements in this component's template
  @ViewChild('childInput') childInput!: ElementRef<HTMLInputElement>;
  @ViewChild('childButton') childButton!: ElementRef<HTMLButtonElement>;
  
  // ContentChild - accesses projected content elements
  @ContentChild('projectedButton') projectedButton!: ElementRef<HTMLButtonElement>;
  
  componentId = Math.random().toString(36).substr(2, 9);
  status = 'Created';
  executedHooks: string[] = [];
  childInputValue = '';
  
  // Status tracking
  viewChildStatus = 'Not Available';
  contentChildStatus = 'Not Available';
  
  // Counters for frequent hooks
  doCheckCount = 0;
  viewCheckedCount = 0;
  contentCheckedCount = 0;
  
  // Throttling for frequent hooks
  private lastDoCheckLog = 0;
  private lastViewCheckedLog = 0;
  private lastContentCheckedLog = 0;
  private readonly LOG_THROTTLE_MS = 2000;
  
  allHooks = [
    'constructor',
    'ngOnChanges', 
    'ngOnInit', 
    'ngDoCheck',
    'ngAfterContentInit',
    'ngAfterContentChecked', 
    'ngAfterViewInit',
    'ngAfterViewChecked',
    'ngOnDestroy'
  ];
  
  constructor() {
    this.logHook('constructor', 'Component instance created', 'init');
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    const changeDetails = Object.keys(changes).map(key => {
      const change = changes[key];
      return `${key}: ${change.previousValue} → ${change.currentValue}`;
    }).join(', ');
    
    this.logHook('ngOnChanges', `Input properties changed: ${changeDetails}`, 'change');
  }
  
  ngOnInit(): void {
    this.status = 'Initialized';
    this.logHook('ngOnInit', 'Component initialized, inputs are set', 'init');
  }
  
  ngDoCheck(): void {
    this.doCheckCount++;
    
    const now = Date.now();
    if (now - this.lastDoCheckLog > this.LOG_THROTTLE_MS) {
      this.logHook('ngDoCheck', `Change detection cycle executed (${this.doCheckCount} times)`, 'change');
      this.lastDoCheckLog = now;
    }
  }
  
  ngAfterContentInit(): void {
    this.status = 'Content Ready';
    
    // Check if projected content is available
    this.contentChildStatus = this.projectedButton ? 'Available' : 'Not Found';
    
    this.logHook('ngAfterContentInit', 
      `📦 CONTENT INIT: Projected content is now initialized. ContentChild status: ${this.contentChildStatus}`, 
      'init');
  }
  
  ngAfterContentChecked(): void {
    this.contentCheckedCount++;
    
    const now = Date.now();
    if (now - this.lastContentCheckedLog > this.LOG_THROTTLE_MS) {
      this.logHook('ngAfterContentChecked', 
        `📦 CONTENT CHECKED: Projected content checked (${this.contentCheckedCount} times)`, 
        'change');
      this.lastContentCheckedLog = now;
    }
  }
  
  ngAfterViewInit(): void {
    this.status = 'View Ready';
    
    // Check if view children are available
    this.viewChildStatus = this.childInput ? 'Available' : 'Not Found';
    
    this.logHook('ngAfterViewInit', 
      `👁️ VIEW INIT: Component view initialized. ViewChild status: ${this.viewChildStatus}`, 
      'init');
      
    // Now we can safely access ViewChild elements
    if (this.childInput) {
      console.log('✅ ViewChild childInput is now accessible:', this.childInput.nativeElement);
    }
  }
  
  ngAfterViewChecked(): void {
    this.viewCheckedCount++;
    
    const now = Date.now();
    if (now - this.lastViewCheckedLog > this.LOG_THROTTLE_MS) {
      this.logHook('ngAfterViewChecked', 
        `👁️ VIEW CHECKED: Component view checked (${this.viewCheckedCount} times)`, 
        'change');
      this.lastViewCheckedLog = now;
    }
  }
  
  ngOnDestroy(): void {
    this.status = 'Destroying';
    this.logHook('ngOnDestroy', '🗑️ Component is being destroyed', 'destroy');
  }
  
  onChildInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.childInputValue = target.value;
  }
  
  onChildButtonClick(): void {
    console.log('🔘 Child button clicked');
  }
  
  private logHook(hook: string, message: string, type: 'init' | 'change' | 'destroy'): void {
    if (!this.executedHooks.includes(hook)) {
      this.executedHooks.push(hook);
    }
    
    this.hookExecuted.emit({ hook, message, type });
    console.log(`[${this.componentId}] ${hook}: ${message}`);
  }
}