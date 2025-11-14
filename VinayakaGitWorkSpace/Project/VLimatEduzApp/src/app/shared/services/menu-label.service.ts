import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuLabelService {
  private labelSubject = new BehaviorSubject<string>('');
  label$ = this.labelSubject.asObservable();

  setLabel(label: string) {
    console.log('Setting label:', label);
    this.labelSubject.next(label);
  }
}
