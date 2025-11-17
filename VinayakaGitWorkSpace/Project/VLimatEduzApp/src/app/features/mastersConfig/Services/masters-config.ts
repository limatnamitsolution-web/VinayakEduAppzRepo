import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MastersConfig {

  private apiUrl = `${environment.apiUrl}Master/MasterConfig/`;

   masterConfigList = signal<any>(null);
  masterConfig = signal<any>(null);

  constructor(private http: HttpClient) {}

  fetchMasterConfig(academicId: string, configuration: string) {
    const url = `${this.apiUrl}GetAll/${academicId}`;
    this.http.post(url, { category: configuration }).subscribe({
      next: data => {
        this.masterConfigList.set(data);
      },
      error: err => {
        console.error('API error for masterConfigList:', err);
        this.masterConfigList.set([]); // fallback to empty array or sensible default
      }
    });
  }

  fetchMasterConfigGet(id: number) {
    const url = `${this.apiUrl}Get/${id}`;
    this.http.get(url).subscribe({
      next: data => {
        this.masterConfig.set(data);
      },
      error: err => {
        this.masterConfig.set([]); // fallback to empty array or sensible default
      }
    });
  }

      createMasterConfig(config: any) {
      const url = `${this.apiUrl}`;
      return this.http.post(url, config);
    }

    updateMasterConfig(config: any) {
      const url = `${this.apiUrl}`;
      return this.http.put(url, config);
    }
}
