import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-components-hub',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './components-hub.component.html',
  styleUrl: './components-hub.component.scss'
})
export class ComponentsHubComponent {}