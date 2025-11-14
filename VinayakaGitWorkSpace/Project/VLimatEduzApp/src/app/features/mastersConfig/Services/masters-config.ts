import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MastersConfig {
  private apiUrl = 'https://localhost:44360/api/Master/MasterConfig/GetAll';

  masterConfig = signal<any>(null);

  constructor(private http: HttpClient) {}

  fetchMasterConfig(academicId: string, configuration: string) {
    const url = `${this.apiUrl}/${academicId}`;
    this.http.post(url, { category: configuration }).subscribe({
      next: data => {
        this.masterConfig.set(data);
      },
      error: err => {
        this.masterConfig.set([]); // fallback to empty array or sensible default
      }
    });
  }
  
}
