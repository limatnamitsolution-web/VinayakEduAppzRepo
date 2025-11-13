import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MastersConfig {
  private apiUrl = 'http://localhost:5229/api/Master/MasterConfig/GetAll';

  masterConfig = signal<any>(null);

  constructor(private http: HttpClient) {}

  fetchMasterConfig(academicId: number, configuration: string) {
    const url = `${this.apiUrl}?academicId=${academicId}&configuration=${encodeURIComponent(configuration)}`;
    this.http.get(url).subscribe({
      next: data => {
      //  console.log('fetchMasterConfig', data);
        this.masterConfig.set(data);
      },
      error: err => {
        //console.error('Error fetching master config:', err);
        this.masterConfig.set([]); // fallback to empty array or sensible default
      }
    });
  }
  
}
