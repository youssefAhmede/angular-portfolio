import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = 'http://localhost:3000/api/skills'; // عنوان الـ API

  constructor(private http: HttpClient) { }

  // جلب جميع المهارات
  getSkills(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // إضافة مهارة جديدة
  addSkill(skill: any): Observable<any> {
    return this.http.post(this.apiUrl, skill);
  }

  // تعديل مهارة موجودة
  updateSkill(id: string, skill: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, skill);
  }

  // حذف مهارة
  deleteSkill(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
