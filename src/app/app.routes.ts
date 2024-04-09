import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { AuthGuard } from './guards/auth.guard';
import { SummaryPageComponent } from './components/summary-page/summary-page.component';
import { QuizCategoryComponent } from './components/quiz-category/quiz-category.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'quiz-category', component: QuizCategoryComponent, canActivate: [AuthGuard]},
    {path: 'quiz/:id', component: QuizPageComponent, canActivate: [AuthGuard]},
    {path: 'summary', component: SummaryPageComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '**', component: LoginComponent, canActivate: [AuthGuard]}
];
