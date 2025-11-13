// app/layout/sidebar.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';

interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  route?: string;
  isActive?: boolean;
  children?: MenuItem[];
  isExpanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar-component.html',
  styleUrls : ['./sidebar-component.scss']
})
export class SidebarComponent {
  menuItems: MenuItem[] = [];
   isCollapsed = false;
  activeMenu: string = 'overview';
  activeSubMenu: string = '';
  expandedMenus: { [key: string]: boolean } = {
    'students': false,
    'id-cards': false,
    'library': false,
    'transport': false
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // fetch sidebar JSON from public folder (served as asset). Using absolute path so it works with different base href.
    this.http.get<MenuItem[]>('/Frontdesk.json').subscribe({
      next: (data) => {
        this.menuItems = data || [];
        // initialize expandedMenus for groups
        for (const item of this.menuItems) {
          if (item.children && item.children.length) {
            if (!(item.key in this.expandedMenus)) {
              this.expandedMenus[item.key] = false;
            }
          }
        }
      },
      error: (err) => {
        // silent fallback: keep hard-coded behavior if fetch fails
        console.error('Failed to load sidebar-data.json', err);
      }
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSubMenu(menuKey: string) {
    // Accordion behavior: collapse all other menus
    Object.keys(this.expandedMenus).forEach(key => {
      this.expandedMenus[key] = (key === menuKey) ? !this.expandedMenus[key] : false;
    });
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