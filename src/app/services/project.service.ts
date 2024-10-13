import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/api/projects'; // عنوان الـ API

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any[]> {  // التأكد من أن `Observable<any[]>` هي النوع المعاد
    return this.http.get<any[]>(this.apiUrl);  // استخدام `http.get` لاسترجاع البيانات
  }

  addProject(project: any): Observable<any> {
    return this.http.post(this.apiUrl, project);
  }

   // دالة لتحديث المشروع
   updateProject(projectId: string, project: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${projectId}`, project);
  }

  // دالة لحذف المشروع
  deleteProject(projectId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${projectId}`);
  }
}