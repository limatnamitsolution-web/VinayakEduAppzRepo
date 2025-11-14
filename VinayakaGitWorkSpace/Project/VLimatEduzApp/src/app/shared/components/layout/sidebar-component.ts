// app/layout/sidebar.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EncryptionService } from '../../services/encryption.service';
import { MenuLabelService } from '../../services/menu-label.service';

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
  imports: [CommonModule],
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
  selectedLabel: string = '';
  labelChanged: ((label: string) => void) | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private encryptionService: EncryptionService,
    private menuLabelService: MenuLabelService
  ) {}
  // Call this method to navigate to dashboard with encrypted key
  navigateToDashboard(menuKey: string) {
    const encryptedKey = this.encryptionService.encrypt(menuKey);
    // Find label for main or submenu
    let label = '';
    const main = this.menuItems.find(item => item.key === menuKey);
    if (main) {
      label = main.label;     
    } else {
      for (const item of this.menuItems) {
        const child = item.children?.find(c => c.key === menuKey);
        
        if (child) {
          label = child.label;
          break;
        }
      }
    }
    this.selectedLabel = label;
    this.menuLabelService.setLabel(label);
    this.router.navigate(['/mastersConfig/dashboard', encryptedKey]);
  }

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
    this.activeSubMenu = '';
    const found = this.menuItems.find(item => item.key === menu);
    if (found) {
      this.selectedLabel = found.label;
      this.menuLabelService.setLabel(found.label);
    }
  }

  setActiveSubMenu(parentMenu: string, subMenu: string) {
    this.activeMenu = parentMenu;
    this.activeSubMenu = subMenu;
    const parent = this.menuItems.find(item => item.key === parentMenu);
    const child = parent?.children?.find(c => c.key === subMenu);
    if (child) {
      this.selectedLabel = child.label;
      this.menuLabelService.setLabel(child.label);
    }
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