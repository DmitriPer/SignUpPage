import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MannegerService {
  private jsonURL = 'en.json';
  private http = inject(HttpClient);
  public texts: any = null;

  constructor() {
    this.loadTexts();
  }

  private loadTexts(): void {
    this.http.get<any>(this.jsonURL).subscribe(
      (data) => {
        this.texts = data;
      },
      (error) => {
        console.error('Error loading texts:', error);
      }
    );
  }

  getTexts(): any {
    return this.texts;
  }
}
