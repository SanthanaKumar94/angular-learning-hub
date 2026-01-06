import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './data-binding.component.html',
  styleUrl: './data-binding.component.scss'
})
export class DataBindingComponent {
  // Signals for reactive state
  userName = signal('Angular Developer');
  currentDate = signal(new Date().toLocaleDateString());
  imageUrl = signal('https://angular.io/assets/images/logos/angular/angular.png');
  imageAlt = signal('Angular Logo');
  imageWidth = signal(100);
  isButtonDisabled = signal(false);
  buttonText = signal('Enabled Button');
  inputValue = signal('Pre-filled value');
  placeholderText = signal('Enter text here...');
  htmlContent = signal('<strong>Bold HTML content</strong>');
  
  // Event binding state
  clickCount = signal(0);
  typedText = signal('');
  hoverText = signal('Hover over me!');
  
  // Two-way binding form data
  formData = {
    name: 'John Doe',
    age: 25,
    message: 'Hello Angular!'
  };
  
  // Attribute binding
  ariaLabel = signal('This is an accessible button');
  dataInfo = signal('custom-data-value');
  roleValue = signal('button');
  tabIndex = signal(0);
  
  // Class binding
  isActive = signal(false);
  isHighlighted = signal(false);
  dynamicClass = signal('default-class');
  
  // Style binding
  textColor = signal('blue');
  fontSize = signal(16);
  dynamicStyles = signal('background-color: yellow; padding: 10px;');

  // Methods
  getMessage(): string {
    return 'This is a method call in interpolation!';
  }

  onButtonClick(): void {
    this.clickCount.update(count => count + 1);
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.typedText.set(target.value);
  }

  onMouseEnter(): void {
    this.hoverText.set('Mouse is over me!');
  }

  onMouseLeave(): void {
    this.hoverText.set('Hover over me!');
  }

  toggleActive(): void {
    this.isActive.update(active => !active);
  }

  toggleHighlight(): void {
    this.isHighlighted.update(highlight => !highlight);
  }

  changeStyles(): void {
    const colors = ['red', 'green', 'blue', 'purple', 'orange'];
    const sizes = [14, 16, 18, 20, 22];
    
    this.textColor.set(colors[Math.floor(Math.random() * colors.length)]);
    this.fontSize.set(sizes[Math.floor(Math.random() * sizes.length)]);
    
    const backgrounds = ['lightblue', 'lightgreen', 'lightyellow', 'lightpink'];
    const bg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    this.dynamicStyles.set(`background-color: ${bg}; padding: 15px; border-radius: 8px;`);
  }

  // Code examples for display
  interpolationCode = `// Component
userName = signal('Angular Developer');
currentDate = signal(new Date().toLocaleDateString());

getMessage(): string {
  return 'This is a method call in interpolation!';
}

// Template
<p>Welcome, {{ userName() }}!</p>
<p>Today is {{ currentDate() }}</p>
<p>2 + 3 = {{ 2 + 3 }}</p>
<p>Message: {{ getMessage() }}</p>`;

  propertyBindingCode = `// Component
imageUrl = signal('https://angular.io/assets/images/logos/angular/angular.png');
imageAlt = signal('Angular Logo');
imageWidth = signal(100);
isButtonDisabled = signal(false);
buttonText = signal('Enabled Button');
inputValue = signal('Pre-filled value');
placeholderText = signal('Enter text here...');
htmlContent = signal('<strong>Bold HTML content</strong>');

// Template
<img [src]="imageUrl()" [alt]="imageAlt()" [width]="imageWidth()">
<button [disabled]="isButtonDisabled()">{{ buttonText() }}</button>
<input [value]="inputValue()" [placeholder]="placeholderText()">
<div [innerHTML]="htmlContent()"></div>`;

  eventBindingCode = `// Component
clickCount = signal(0);
typedText = signal('');
hoverText = signal('Hover over me!');

onButtonClick(): void {
  this.clickCount.update(count => count + 1);
}

onInputChange(event: Event): void {
  const target = event.target as HTMLInputElement;
  this.typedText.set(target.value);
}

onMouseEnter(): void {
  this.hoverText.set('Mouse is over me!');
}

// Template
<button (click)="onButtonClick()">Click Me!</button>
<p>Button clicked {{ clickCount() }} times</p>
<input (input)="onInputChange($event)" placeholder="Type something...">
<p>You typed: {{ typedText() }}</p>
<button (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
  {{ hoverText() }}
</button>`;

  twoWayBindingCode = `// Component (requires FormsModule import)
formData = {
  name: 'John Doe',
  age: 25,
  message: 'Hello Angular!'
};

// Template
<label>Name: </label>
<input [(ngModel)]="formData.name" placeholder="Enter your name">
<p>Hello, {{ formData.name }}!</p>

<label>Age: </label>
<input type="number" [(ngModel)]="formData.age" placeholder="Enter age">
<p>You are {{ formData.age }} years old</p>

<label>Message: </label>
<textarea [(ngModel)]="formData.message" rows="3" cols="30"></textarea>
<p>Your message: {{ formData.message }}</p>`;

  attributeBindingCode = `// Component
ariaLabel = signal('This is an accessible button');
dataInfo = signal('custom-data-value');
roleValue = signal('button');
tabIndex = signal(0);

// Template
<button [attr.aria-label]="ariaLabel()" [attr.data-info]="dataInfo()">
  Accessible Button
</button>
<div [attr.role]="roleValue()" [attr.tabindex]="tabIndex()">
  Custom Div with Attributes
</div>`;

  classBindingCode = `// Component
isActive = signal(false);
isHighlighted = signal(false);
dynamicClass = signal('default-class');

toggleActive(): void {
  this.isActive.update(active => !active);
}

toggleHighlight(): void {
  this.isHighlighted.update(highlight => !highlight);
}

// Template
<div [class]="dynamicClass()">Dynamic class binding</div>
<div [class.active]="isActive()" [class.highlight]="isHighlighted()">
  Conditional classes
</div>
<button (click)="toggleActive()">Toggle Active</button>
<button (click)="toggleHighlight()">Toggle Highlight</button>

// CSS
.active {
  background-color: #4caf50 !important;
  color: white;
}
.highlight {
  border: 2px solid #ff9800 !important;
}`;

  styleBindingCode = `// Component
textColor = signal('blue');
fontSize = signal(16);
dynamicStyles = signal('background-color: yellow; padding: 10px;');

changeStyles(): void {
  const colors = ['red', 'green', 'blue', 'purple', 'orange'];
  const sizes = [14, 16, 18, 20, 22];
  
  this.textColor.set(colors[Math.floor(Math.random() * colors.length)]);
  this.fontSize.set(sizes[Math.floor(Math.random() * sizes.length)]);
  
  const backgrounds = ['lightblue', 'lightgreen', 'lightyellow', 'lightpink'];
  const bg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  this.dynamicStyles.set(\`background-color: \${bg}; padding: 15px; border-radius: 8px;\`);
}

// Template
<div [style.color]="textColor()" [style.font-size.px]="fontSize()">
  Styled text
</div>
<div [style]="dynamicStyles()">
  Multiple styles
</div>
<button (click)="changeStyles()">Change Styles</button>`;
}