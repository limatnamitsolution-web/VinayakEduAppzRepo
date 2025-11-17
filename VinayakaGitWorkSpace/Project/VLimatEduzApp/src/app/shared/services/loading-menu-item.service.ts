import { Injectable, signal } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class LoadingMenuItemService {
  // Signal array for menu items
  readonly menuItems = signal<MenuItem[]>([]);

  async setMenuItems(items: MenuItem[]) {
    // Simulate async if needed, e.g., for future API or storage
    this.menuItems.set(items);
    return Promise.resolve();
  }

  getMenuItems() {
    return this.menuItems();
  }
}
