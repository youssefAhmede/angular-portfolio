// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
        return true; // يسمح بالوصول إذا لم يكن مسجلاً الدخول
    }
    // إذا كان المستخدم مسجلاً الدخول، نعيد توجيهه إلى الصفحة الرئيسية أو أي صفحة أخرى
    this.router.navigate(['/home']); // يمكنك تغيير ذلك إلى الصفحة التي تريدها
    return false; // يمنع الوصول إلى صفحة تسجيل الدخول
  }
}

    
  