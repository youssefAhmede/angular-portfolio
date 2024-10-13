import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // استيراد HttpClient
import { Router } from '@angular/router'; // استيراد Router للتنقل بعد تسجيل الدخول
import { AuthService } from '../services/auth.service'; // استيراد AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const loginData = { username: this.username, password: this.password };

    // إرسال طلب تسجيل الدخول
    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        this.authService.setToken(response.token); // تخزين التوكن
        this.router.navigate(['/home']); // التوجيه إلى صفحة الـ home
      },
      error: (error: any) => { // إضافة نوع `any` للمعامل
        console.error('Error occurred:', error);
        alert('Invalid username or password');
      }
    });
  }
}
