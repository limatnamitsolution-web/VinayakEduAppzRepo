// app/layout/header.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="topbar">
      <div class="topbar-inner">
        <div class="brand">
          <div class="brand-badge">EZ</div>
          <div class="brand-title">EduZ Platform</div>
        </div>

        <div class="top-actions">
          <!-- Theme Toggle -->
          <div class="theme-toggle">
            <button class="theme-toggle-btn" (click)="toggleThemeSwitcher($event)">
              <i class="fas fa-palette"></i>
              <span>Themes</span>
            </button>
            <div class="theme-switcher" [class.active]="isThemeSwitcherOpen">
              <div class="theme-options">
                <label class="theme-option theme-light" [class.active]="currentTheme === 'light'">
                  <input type="radio" name="theme" value="light" [checked]="currentTheme === 'light'" 
                         (change)="changeTheme('light')">
                  <div class="theme-color-box">
                    <div class="theme-preview">
                      <div class="preview-bar"></div>
                      <div class="preview-dot"></div>
                    </div>
                  </div>
                  <span class="theme-label">Light</span>
                  <div class="theme-badge">Default</div>
                </label>
                
                <label class="theme-option theme-dark" [class.active]="currentTheme === 'dark'">
                  <input type="radio" name="theme" value="dark" [checked]="currentTheme === 'dark'"
                         (change)="changeTheme('dark')">
                  <div class="theme-color-box">
                    <div class="theme-preview">
                      <div class="preview-bar"></div>
                      <div class="preview-dot"></div>
                    </div>
                  </div>
                  <span class="theme-label">Dark</span>
                  <div class="theme-badge">Popular</div>
                </label>
                
                <label class="theme-option theme-color" [class.active]="currentTheme === 'color'">
                  <input type="radio" name="theme" value="color" [checked]="currentTheme === 'color'"
                         (change)="changeTheme('color')">
                  <div class="theme-color-box">
                    <div class="theme-preview">
                      <div class="preview-bar"></div>
                      <div class="preview-dot"></div>
                    </div>
                  </div>
                  <span class="theme-label">Amber</span>
                </label>
                
                <label class="theme-option theme-dark-color" [class.active]="currentTheme === 'dark-color'">
                  <input type="radio" name="theme" value="dark-color" [checked]="currentTheme === 'dark-color'"
                         (change)="changeTheme('dark-color')">
                  <div class="theme-color-box">
                    <div class="theme-preview">
                      <div class="preview-bar"></div>
                      <div class="preview-dot"></div>
                    </div>
                  </div>
                  <span class="theme-label">Neon</span>
                  <div class="theme-badge accent">New</div>
                </label>
                
                <label class="theme-option theme-crazy" [class.active]="currentTheme === 'crazy'">
                  <input type="radio" name="theme" value="crazy" [checked]="currentTheme === 'crazy'"
                         (change)="changeTheme('crazy')">
                  <div class="theme-color-box">
                    <div class="theme-preview">
                      <div class="preview-bar"></div>
                      <div class="preview-dot"></div>
                    </div>
                  </div>
                  <span class="theme-label">Rainbow</span>
                  <div class="theme-badge warning">Fun</div>
                </label>
              </div>
            </div>
          </div>

          <button class="icon-btn" title="Notifications"><i class="fas fa-bell"></i></button>
          <button class="icon-btn" title="Help"><i class="fas fa-circle-question"></i></button>
          
          <div class="profile">
            <button class="module-switcher-btn" (click)="toggleModuleSwitcher()">
              <i class="fas fa-layer-group"></i>
              <span>Switch Module</span>
            </button>
            
            <div class="avatar">JD</div>
            <button class="icon-btn" title="Profile"><i class="fas fa-ellipsis-vertical"></i></button>
          </div>
        </div>
      </div>
    </header>

    <!-- Module Switcher Overlay -->
    <div class="module-switcher-overlay" [class.active]="isModuleSwitcherOpen" (click)="closeModuleSwitcher()">
      <div class="module-switcher-popup" (click)="$event.stopPropagation()">
        <div class="module-switcher-header">
          <div class="module-switcher-title">Switch Module</div>
          <button class="close-btn" (click)="closeModuleSwitcher()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="module-list">
          <div class="module-item active">
            <div class="module-icon"><i class="fas fa-users"></i></div>
            <span class="module-name">Student</span>
          </div>
          <div class="module-item">
            <div class="module-icon"><i class="fas fa-money-bill-wave"></i></div>
            <span class="module-name">Fee</span>
          </div>
          <div class="module-item">
            <div class="module-icon"><i class="fas fa-file-invoice-dollar"></i></div>
            <span class="module-name">Payroll</span>
          </div>
          <div class="module-item">
            <div class="module-icon"><i class="fas fa-chart-line"></i></div>
            <span class="module-name">Result</span>
          </div>
          <div class="module-item">
            <div class="module-icon"><i class="fas fa-calendar-alt"></i></div>
            <span class="module-name">Timetable</span>
          </div>
          <div class="module-item">
            <div class="module-icon"><i class="fas fa-book"></i></div>
            <span class="module-name">Library</span>
          </div>
          <div class="module-item">
            <div class="module-icon"><i class="fas fa-bus"></i></div>
            <span class="module-name">Transport</span>
          </div>
          <div class="module-item">
            <div class="module-icon"><i class="fas fa-bed"></i></div>
            <span class="module-name">Hostel</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Module Switcher Styles */
    .module-switcher-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      display: none;
      z-index: 1000;
      align-items: center;
      justify-content: center;
    }
    
    .module-switcher-overlay.active {
      display: flex;
    }
    
    .module-switcher-popup {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
      width: 90%;
      max-width: 480px;
      max-height: 80vh;
      overflow-y: auto;
      z-index: 1001;
      position: relative;
      animation: popupFadeIn 0.3s ease-out;
    }
    
    @keyframes popupFadeIn {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(-10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    
    .module-switcher-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
    }
    
    .module-switcher-title {
      font-weight: 600;
      font-size: 15px;
      color: var(--text);
    }
    
    .close-btn {
      background: transparent;
      border: none;
      font-size: 14px;
      cursor: pointer;
      width: 28px;
      height: 28px;
      border-radius: 6px;
      display: grid;
      place-items: center;
      transition: all 0.2s ease;
      color: var(--text-3);
    }
    
    .close-btn:hover {
      background: var(--muted-surface);
    }
    
    .module-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 8px;
      padding: 16px 20px;
    }
    
    .module-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
      border-radius: 8px;
      text-decoration: none;
      border: 1px solid var(--border);
      transition: all 0.2s ease;
      cursor: pointer;
      font-size: 13px;
      color: var(--text-2);
    }
    
    .module-item:hover {
      background: var(--muted-surface);
      border-color: var(--primary-blue);
      transform: translateY(-1px);
      box-shadow: var(--shadow-2);
    }
    
    .module-item.active {
      background: var(--light-blue);
      border-color: var(--primary-blue);
      color: var(--dark-blue);
    }
    
    .module-icon {
      width: 18px;
      height: 18px;
      display: grid;
      place-items: center;
      font-size: 12px;
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isThemeSwitcherOpen = false;
  isModuleSwitcherOpen = false;
  currentTheme: string = 'light';
  private themeSubscription!: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  toggleThemeSwitcher(event: Event) {
    event.stopPropagation();
    this.isThemeSwitcherOpen = !this.isThemeSwitcherOpen;
  }

  @HostListener('document:click')
  closeThemeSwitcher() {
    this.isThemeSwitcherOpen = false;
  }

  changeTheme(theme: string) {
    this.themeService.setTheme(theme);
    this.isThemeSwitcherOpen = false;
  }

  toggleModuleSwitcher() {
    this.isModuleSwitcherOpen = !this.isModuleSwitcherOpen;
  }

  closeModuleSwitcher() {
    this.isModuleSwitcherOpen = false;
  }
}