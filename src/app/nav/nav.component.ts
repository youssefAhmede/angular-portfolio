import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn = false; // حالة تسجيل الدخول

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // الاشتراك في مراقبة حالة تسجيل الدخول
    this.authService.getLoggedInStatus().subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

  onLogout() {
    this.authService.logout(); // استدعاء دالة تسجيل الخروج
    alert('log out');
    this.router.navigate(['/login']);
  }
  // إضافة هذه الدالة للتحقق مما إذا كان المستخدم هو 'youssef'
  isYoussef(): boolean {
    return this.authService.isYoussef();
  }
  
}
