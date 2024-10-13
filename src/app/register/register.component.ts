import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // تأكد من استيراد AuthService
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';  // رسالة النجاح

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res: any) => {
          console.log('User registered successfully');
          this.successMessage = 'Registration successful! Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/login']);  // التوجيه إلى صفحة تسجيل الدخول بعد 3 ثواني
          }, 3000);
        },
        error: (err: any) => { // إضافة نوع `any` للمعامل
          console.log('Error occurred:', err);
          this.errorMessage = err.error.message;  // عرض رسالة الخطأ
        }
      });
    }
  }
}
