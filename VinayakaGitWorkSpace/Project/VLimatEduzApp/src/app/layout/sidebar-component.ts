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
  templateUrl: './sidebar-component.html',

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