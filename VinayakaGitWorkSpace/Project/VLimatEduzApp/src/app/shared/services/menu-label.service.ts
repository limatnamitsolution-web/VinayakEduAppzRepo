import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuLabelService {
  private labelSubject = new BehaviorSubject<MenuItem>({
    key: '',
    label: '',
    icon: '',
    route: '',
    isActive: false,
    children: [],
    isExpanded: false
  });
  
  label$ = this.labelSubject.asObservable();

  setLabel(label: MenuItem) {
    this.labelSubject.next(label);
  }
}
interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  route?: string;
  isActive?: boolean;
  children?: MenuItem[];
  isExpanded?: boolean;
}