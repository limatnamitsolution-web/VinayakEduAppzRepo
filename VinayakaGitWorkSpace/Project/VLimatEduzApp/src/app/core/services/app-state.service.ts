import { Injectable, signal } from '@angular/core';
import { IAppContext } from '../models/app-context.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  readonly userState = signal<IAppContext>({
    userId: null,
    userName: null,
    academicId: null,
    academicName: null,
    fyId: null,
    fy: null
  });

  constructor() { }

  setFinancialYear(id: number, name: string) {
    this.userState.update(state => ({ ...state, fyId: id, fy: name }));
  }

  setAcademicYear(id: number, name: string) {
    this.userState.update(state => ({ ...state, academicId: id, academicName: name }));
  }

  setUser(id: number, name: string) {
    this.userState.update(state => ({ ...state, userId: id, userName: name }));
  }

  clearState() {
    this.userState.set({
      userId: null,
      userName: null,
      academicId: null,
      academicName: null,
      fyId: null,
      fy: null
    });
  }
}
