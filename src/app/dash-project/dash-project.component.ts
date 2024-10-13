// import { Component, OnInit } from '@angular/core';
// import { ProjectService } from '../services/project.service';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-dash-project',
//   templateUrl: './dash-project.component.html',
//   styleUrls: ['./dash-project.component.css']
// })

// export class DashProjectComponent implements OnInit {
//     projects: any[] = []; // تأكد من أن هذا هو الشكل الصحيح للبيانات
  
//     constructor(private projectService: ProjectService) {}
  
//     ngOnInit(): void {
//       this.loadProjects();
//     }
  
//     loadProjects(): void {
//         this.projectService.getProjects().subscribe({
//           next: (data) => {
//             console.log(data); // تحقق من البيانات هنا
//             this.projects = data;
//           },
//           error: (err) => {
//             console.error('Error fetching projects:', err);
//           }
//         });
//       }
      
//   }
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { SkillService } from '../services/skill.service';

@Component({
  selector: 'app-dash-project',
  templateUrl: './dash-project.component.html',
  styleUrls: ['./dash-project.component.css']
})
export class DashProjectComponent implements OnInit {
  projects: any[] = [];
  skills: any[] = [];  // لتخزين المهارات
  selectedProject: any = null;  // لتخزين المشروع المراد تعديله

  constructor(private projectService: ProjectService, private skillService: SkillService) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadSkills();  // تحميل المهارات عند بدء المكون
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  // دالة لتحميل المهارات
  loadSkills(): void {
    this.skillService.getSkills().subscribe({
      next: (data) => {
        this.skills = data;
      },
      error: (err) => {
        console.error('Error fetching skills:', err);
      }
    });
  }

  // دالة لتحديد المشروع الذي سيتم تعديله
  editProject(project: any): void {
    this.selectedProject = { ...project };  // نسخ المشروع لتعديله
  }

  // دالة لتحديث المشروع
  updateProject(): void {
    this.projectService.updateProject(this.selectedProject._id, this.selectedProject).subscribe({
      next: (updatedProject) => {
        this.loadProjects();  // إعادة تحميل المشاريع بعد التحديث
        this.selectedProject = null;  // إخفاء الفرم بعد التحديث
      },
      error: (err) => {
        console.error('Error updating project:', err);
      }
    });
  }

  // دالة لحذف المشروع
  deleteProject(projectId: string): void {
    this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        this.loadProjects();  // إعادة تحميل المشاريع بعد الحذف
      },
      error: (err) => {
        console.error('Error deleting project:', err);
      }
    });
  }

  // دالة لحذف skill
  deleteSkill(skillId: string): void {
    this.skillService.deleteSkill(skillId).subscribe({
      next: () => {
        this.loadSkills();  // إعادة تحميل المهارات بعد الحذف
      },
      error: (err) => {
        console.error('Error deleting skill:', err);
      }
    });
  }
}
