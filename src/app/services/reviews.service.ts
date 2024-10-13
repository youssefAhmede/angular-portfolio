import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = 'http://localhost:3000/api/reviews'; // عنوان الـ API

  constructor(private http: HttpClient) { }

  addReview(review: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // تحديد نوع المحتوى كـ JSON
    });
    return this.http.post(this.apiUrl, JSON.stringify(review), { headers });
  }
  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }  
}
