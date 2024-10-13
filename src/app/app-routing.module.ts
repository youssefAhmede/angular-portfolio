// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashProjectComponent } from './dash-project/dash-project.component';
// import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { ProjectCardsComponent } from './project-cards/project-cards.component';
// import { authGuard } from './guards/auth.guard';
import { CvComponent } from './cv/cv.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { NoAuthGuard } from './guard/no-auth.guard';
import { ReviewsComponent } from './reviews/reviews.component';
import { adminGuard } from './guard/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
//   { path: '*', component: HomeComponent },
// { path: '*', component: HomeComponent },
{ path: 'home', component: HomeComponent },
{ path: 'about', component: AboutComponent },
//   { path: 'dashboard', component: DashboardComponent },
{ path: 'dashboard', component: DashboardComponent , canActivate: [adminGuard] }, // حماية المسار
  { path: 'dashpro', component: DashProjectComponent , canActivate: [adminGuard] },
  { path: 'cv', component: CvComponent },
//   { path: 'reviews', component: ReviewsComponent , canActivate: [AuthGuard] },
  { path: 'reviews', component: ReviewsComponent },
//   { path: 'projects', component: ProjectsComponent },
  { path: 'projects', component: ProjectCardsComponent },
  { path: 'login', component: LoginComponent , canActivate: [NoAuthGuard]},
  // { path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [noAuthGuard]  },  
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  //{ path: 'login', redirectTo: '/login', pathMatch: 'full' }  // إعادة التوجيه إلى صفحة تسجيل الدخول بشكل افتراضي
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
