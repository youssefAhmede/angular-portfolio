import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-cards',
  templateUrl: './project-cards.component.html',
  styleUrl: './project-cards.component.css'
})

export class ProjectCardsComponent implements OnInit {
    projects: any[] = []; // تأكد من أن هذا هو الشكل الصحيح للبيانات
  
    constructor(private projectService: ProjectService) {}
  
    ngOnInit(): void {
      this.loadProjects();
    }
  
    loadProjects(): void {
        this.projectService.getProjects().subscribe({
          next: (data) => {
            console.log(data); // تحقق من البيانات هنا
            this.projects = data;
          },
          error: (err) => {
            console.error('Error fetching projects:', err);
          }
        });
      }
      
  }