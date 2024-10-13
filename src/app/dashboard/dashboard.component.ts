// dashboard.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service'; // تأكد من المسار الصحيح للخدمة
import { SkillService } from './../services/skill.service'; // تأكد من المسار الصحيح للخدمة

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  projectForm: FormGroup;
  skillForm: FormGroup;
  formSubmitted: boolean = false;
  submissionMessage: string = '';
  
  constructor(private fb: FormBuilder, 
              private projectService: ProjectService, 
              private skillService: SkillService) {
    
    // إعداد نموذج المشروع
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      githubUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
    
    // إعداد نموذج المهارة
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const newProject = {
      name: this.projectForm.value.name,
      description: this.projectForm.value.description,
      githubUrl: this.projectForm.value.githubUrl,
      imageUrl: this.projectForm.value.imageUrl,
    };
    
    console.log(newProject); // عرض القيم
    this.projectService.addProject(newProject).subscribe({
      next: (response) => {
        this.submissionMessage = 'Project added successfully!';
        this.formSubmitted = true;
        this.projectForm.reset();
      },
      error: (err) => {
        this.submissionMessage = 'Error adding project. Please try again.';
        console.error(err);
      }
    });
  }

  SkillSubmit(): void {
    const newSkill = {
      name: this.skillForm.value.name,
    };
    
    console.log(newSkill); // عرض القيم
    this.skillService.addSkill(newSkill).subscribe({
      next: (response) => {
        this.submissionMessage = 'Skill added successfully!';
        this.formSubmitted = true;
        this.skillForm.reset();
      },
      error: (err) => {
        this.submissionMessage = 'Error adding skill. Please try again.';
        console.error(err);
      }
    });
  }
}
