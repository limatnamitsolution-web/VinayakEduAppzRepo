// app/layout/sidebar.component.ts
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  isActive?: boolean;
  children?: MenuItem[];
  isExpanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
   <!-- Update your sidebar.component.html template -->
<aside class="left-panel" tabindex="0" [class.collapsed]="isCollapsed">
  <div class="sidenav">
    <div class="sidenav-header">
      <span class="sidenav-title">Menu</span>
      <button class="sidenav-toggle" (click)="toggleSidebar()" title="Toggle Collapse">
        <i class="fas fa-angles-left" [class.rotated]="isCollapsed"></i>
      </button>
    </div>
    
    <nav class="sidenav-menu">
      <!-- Overview -->
      <a class="snav-item" 
         [class.active]="activeMenu === 'overview'"
         routerLink="/student" 
         routerLinkActive="active"
         (click)="setActiveMenu('overview')">
        <div class="snav-icon">
          <i class="fas fa-gauge"></i>
        </div>
        <span>Overview</span>
        <div class="tooltip">Overview</div>
      </a>

      <!-- Students Menu Group -->
      <div class="snav-group">
        <div class="snav-item snav-toggle" 
             [class.active]="activeMenu === 'students'"
             (click)="toggleSubMenu('students')">
          <div class="snav-icon">
            <i class="fas fa-users"></i>
          </div>
          <span>Students</span>
          <i class="fas fa-chevron-down snav-caret" [class.rotated]="expandedMenus['students']"></i>
          <div class="tooltip">Students</div>
        </div>
        <div class="snav-sub" [class.expanded]="expandedMenus['students']">
          <a class="snav-sub-item" 
             [class.active]="isSubMenuActive('students', 'list')"
             routerLink="/student/list"
             (click)="setActiveSubMenu('students', 'list')">
            <span>Student List</span>
          </a>
          <a class="snav-sub-item" 
             [class.active]="isSubMenuActive('students', 'admissions')"
             routerLink="/student/admissions"
             (click)="setActiveSubMenu('students', 'admissions')">
            <span>Admissions</span>
          </a>
          <a class="snav-sub-item" 
             [class.active]="isSubMenuActive('students', 'attendance')"
             routerLink="/student/attendance"
             (click)="setActiveSubMenu('students', 'attendance')">
            <span>Attendance</span>
          </a>
          <a class="snav-sub-item" 
             [class.active]="isSubMenuActive('students', 'reports')"
             routerLink="/student/reports"
             (click)="setActiveSubMenu('students', 'reports')">
            <span>Reports</span>
          </a>
        </div>
      </div>

      <!-- ID & Cards Menu Group -->
      <div class="snav-group">
        <div class="snav-item snav-toggle" 
             [class.active]="activeMenu === 'id-cards'"
             (click)="toggleSubMenu('id-cards')">
          <div class="snav-icon">
            <i class="fas fa-id-card"></i>
          </div>
          <span>ID & Cards</span>
          <i class="fas fa-chevron-down snav-caret" [class.rotated]="expandedMenus['id-cards']"></i>
          <div class="tooltip">ID & Cards</div>
        </div>
        <div class="snav-sub" [class.expanded]="expandedMenus['id-cards']">
          <a class="snav-sub-item" 
             [class.active]="isSubMenuActive('id-cards', 'generate')"
             routerLink="/student/id-cards"
             (click)="setActiveSubMenu('id-cards', 'generate')">
            <span>Generate ID Cards</span>
          </a>
          <a class="snav-sub-item" 
             [class.active]="isSubMenuActive('id-cards', 'templates')"
             routerLink="/student/templates"
             (click)="setActiveSubMenu('id-cards', 'templates')">
            <span>Card Templates</span>
          </a>
          <a class="snav-sub-item" 
             [class.active]="isSubMenuActive('id-cards', 'print')"
             routerLink="/student/print"
             (click)="setActiveSubMenu('id-cards', 'print')">
            <span>Print Batches</span>
          </a>
        </div>
      </div>

      <!-- Other menu items remain the same -->
      <a class="snav-item" 
         [class.active]="activeMenu === 'library'"
         routerLink="/library" 
         (click)="setActiveMenu('library')">
        <div class="snav-icon">
          <i class="fas fa-book"></i>
        </div>
        <span>Library</span>
        <div class="tooltip">Library</div>
      </a>

      <a class="snav-item" 
         [class.active]="activeMenu === 'transport'"
         routerLink="/transport" 
         (click)="setActiveMenu('transport')">
        <div class="snav-icon">
          <i class="fas fa-bus"></i>
        </div>
        <span>Transport</span>
        <div class="tooltip">Transport</div>
      </a>

      <a class="snav-item" 
         [class.active]="activeMenu === 'hostel'"
         routerLink="/hostel" 
         (click)="setActiveMenu('hostel')">
        <div class="snav-icon">
          <i class="fas fa-bed"></i>
        </div>
        <span>Hostel</span>
        <div class="tooltip">Hostel</div>
      </a>

      <a class="snav-item" 
         [class.active]="activeMenu === 'settings'"
         routerLink="/settings" 
         (click)="setActiveMenu('settings')">
        <div class="snav-icon">
          <i class="fas fa-cogs"></i>
        </div>
        <span>Settings</span>
        <div class="tooltip">Settings</div>
      </a>
    </nav>
  </div>
</aside>
  `,
  styles: [`
    .snav-caret.rotated {
      transform: rotate(180deg);
    }
    
    .sidenav-toggle i.rotated {
      transform: rotate(180deg);
    }
    
    .left-panel.collapsed {
      width: 60px;
    }
    
    .left-panel.collapsed .sidenav-title,
    .left-panel.collapsed .snav-item span,
    .left-panel.collapsed .snav-caret {
      display: none;
    }
    
    .left-panel.collapsed .snav-item {
      grid-template-columns: 1fr;
      place-items: center;
      padding: 8px;
    }
    
    .left-panel.collapsed .snav-item.snav-toggle {
      grid-template-columns: 1fr;
    }
    
    .left-panel.collapsed .snav-sub {
      display: none;
    }
    
    .left-panel.collapsed .snav-item .snav-icon {
      margin: 0 auto;
    }
  `]
})
export class SidebarComponent {
   isCollapsed = false;
  activeMenu: string = 'overview';
  activeSubMenu: string = '';
  expandedMenus: { [key: string]: boolean } = {
    'students': false,
    'id-cards': false,
    'library': false,
    'transport': false
  };

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSubMenu(menuKey: string) {
    this.expandedMenus[menuKey] = !this.expandedMenus[menuKey];
  }

  setActiveMenu(menu: string) {
    this.activeMenu = menu;
    this.activeSubMenu = ''; // Reset submenu when clicking main menu
  }

  setActiveSubMenu(parentMenu: string, subMenu: string) {
    this.activeMenu = parentMenu;
    this.activeSubMenu = subMenu;
  }

  isSubMenuActive(parentMenu: string, subMenuLabel: string): boolean {
    return this.activeMenu === parentMenu && this.activeSubMenu === subMenuLabel;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.isCollapsed) {
      this.isCollapsed = false;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.isCollapsed) {
      this.isCollapsed = true;
    }
  }
}