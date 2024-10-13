import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.authService.isYoussef()) {
        console.log('login - youssef');
        return true; // السماح بالوصول فقط إذا كان المستخدم هو 'youssef'
    } else {
        this.router.navigate(['/login']); // إعادة التوجيه إلى صفحة تسجيل الدخول
        return false; // يمنع الوصول
    }
  }
}

