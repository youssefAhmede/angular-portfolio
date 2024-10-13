// // auth.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000/api';
//   private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

//   constructor(private http: HttpClient) {}

//   // دالة لتسجيل الدخول
//   login(loginData: { username: string; password: string }): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, loginData);
//   }

//   // دالة لتعيين التوكن
//   setToken(token: string): void {
//     localStorage.setItem('authToken', token);
//     localStorage.setItem('authUser', JSON.stringify({ username: 'youssef' })); // حفظ اسم المستخدم
//     this.loggedIn.next(true);
//   }

//   // دالة للحصول على التوكن
//   getToken(): string | null {
//     return localStorage.getItem('authToken');
//   }

//   // دالة للتحقق مما إذا كان المستخدم مسجلاً دخوله
//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }

//   // دالة للحصول على حالة تسجيل الدخول
//   getLoggedInStatus(): Observable<boolean> {
//     return this.loggedIn.asObservable();
//   }

//   // دالة لتسجيل الخروج
//   logout(): void {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('authUser'); // إزالة اسم المستخدم من التخزين المحلي
//     this.loggedIn.next(false);
//   }

//   // دالة للتسجيل
//   register(registerData: { username: string; password: string }): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, registerData);
//   }

//   // دالة للتحقق مما إذا كان المستخدم الحالي هو 'youssef'
//   isYoussef(): boolean {
//     const user = localStorage.getItem('authUser');
//     console.log(user);
//     return user ? JSON.parse(user).username === 'youssef' : false;
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient) {}

  login(loginData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      tap((response: any) => {
        this.setToken(response.token);
        localStorage.setItem('authUser', JSON.stringify({ username: loginData.username }));
        console.log('Stored user:', localStorage.getItem('authUser')); // راقب القيمة المخزنة
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.loggedIn.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    this.loggedIn.next(false);
  }
  // دالة للتسجيل
  register(registerData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerData);
  }
  isYoussef(): boolean {
    const user = localStorage.getItem('authUser');
    console.log(user);
    return user ? JSON.parse(user).username === 'youssef' : false;
  }
}
