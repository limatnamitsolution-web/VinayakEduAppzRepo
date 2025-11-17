// app/layout/header.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { MenuLabelService } from '../../services/menu-label.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModuleSwitcherComponent } from "../module-switcher/module-switcher.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ModuleSwitcherComponent],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isThemeSwitcherOpen = false;
  isModuleSwitcherOpen = false;
  currentTheme: string = 'light';
  private themeSubscription!: Subscription;
  private labelSubscription!: Subscription;
  selectedMenuLabel: string = '';
  selectedLabel: string = '';

  constructor(
    private themeService: ThemeService,
    private menuLabelService: MenuLabelService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
    this.labelSubscription = this.menuLabelService.label$.subscribe(label => {
      this.selectedMenuLabel = label.label;
      this.selectedLabel = label.label;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    if (this.labelSubscription) {
      this.labelSubscription.unsubscribe();
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