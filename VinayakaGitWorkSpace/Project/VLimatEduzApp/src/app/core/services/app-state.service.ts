import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IAppContext } from '../models/app-context.model';
import { EncryptionService } from '../../shared/services/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private encryptionService = inject(EncryptionService);
  private platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'app_context';

  readonly userState = signal<IAppContext>({
    userId: null,
    userName: null,
    academicId: null,
    academicName: null,
    fyId: null,
    fy: null
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const storedState = localStorage.getItem(this.STORAGE_KEY);
      if (storedState) {
        try {
          const decryptedState = this.encryptionService.decrypt(storedState);
          if (decryptedState) {
            this.userState.set(JSON.parse(decryptedState));
          }
        } catch (error) {
          console.error('Error restoring app state:', error);
          localStorage.removeItem(this.STORAGE_KEY);
        }
      }

      effect(() => {
        const state = this.userState();
        const encryptedState = this.encryptionService.encrypt(JSON.stringify(state));
        localStorage.setItem(this.STORAGE_KEY, encryptedState);
      });
    }
  }

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
