import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from './services/project.service'; 
import { AppRoutingModule } from './app-routing.module'; // تأكد من استيراده
import { RouterModule } from '@angular/router'; // تأكد من استيراده
import { AppComponent } from './app.component';
// import { FirstComponent } from './first/first.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { TdfComponent } from './tdf/tdf.component';
// import { DemoComponent } from './demo/demo.component';
import { DashSkillsComponent } from './dash-skills/dash-skills.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashProjectComponent } from './dash-project/dash-project.component';
// import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';

import { CommonModule } from '@angular/common';
import { ProjectCardsComponent } from './project-cards/project-cards.component';
import { NavComponent } from './nav/nav.component';
import { CvComponent } from './cv/cv.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { ReviewsComponent } from './reviews/reviews.component';
// import { DashProjectComponent } from './dash-project/dash-project.component'; // تأكد من المسار الصحيح
// import { ProjectCardsComponent } from './project-cards/project-cards.component';
// import { ProjectCardsComponent } from './project-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    // FirstComponent,
    // TdfComponent,
    // DemoComponent,
    DashSkillsComponent,
    HomeComponent,
    AboutComponent,
    DashboardComponent,
    // ProjectsComponent,
    LoginComponent,
    ProjectCardsComponent,
    DashProjectComponent,
    DashSkillsComponent,
    NavComponent,
    CvComponent,
    FooterComponent,
    RegisterComponent,
    ReviewsComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule ,
    RouterModule,
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
