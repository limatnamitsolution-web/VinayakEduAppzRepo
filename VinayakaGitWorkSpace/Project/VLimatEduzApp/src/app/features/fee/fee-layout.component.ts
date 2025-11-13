// modules/fee/fee-layout.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-fee-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="fee-module">
      <router-outlet></router-outlet>
    </div>
  `
})
export class FeeLayoutComponent { }