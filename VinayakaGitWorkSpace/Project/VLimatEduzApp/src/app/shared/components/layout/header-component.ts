// app/layout/header.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.scss']
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