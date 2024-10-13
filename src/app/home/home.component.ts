import { Component, OnInit } from '@angular/core';
import { SkillService } from './../services/skill.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    skills: any[] = []; // تأكد من أن هذا هو الشكل الصحيح للبيانات
  
    constructor(private skillService: SkillService) {}
  
    ngOnInit(): void {
      this.loadSkills();
    }
  
    loadSkills(): void {
        this.skillService.getSkills().subscribe({
          next: (data) => {
            console.log(data); // تحقق من البيانات هنا
            this.skills = data;
          },
          error: (err) => {
            console.error('Error fetching skills:', err);
          }
        });
      }
}
