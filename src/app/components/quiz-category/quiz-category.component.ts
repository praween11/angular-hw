import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizData, Quizs } from '@app/models/quiz-data';
import { QuizService } from '@app/services/quiz.service';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Component({
  selector: 'app-quiz-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-category.component.html',
  styleUrl: './quiz-category.component.css'
})
export class QuizCategoryComponent implements OnInit {
  quizDataEmitter$!: Observable<QuizData[]>;
  constructor(private quizService: QuizService, private route: Router){}

  ngOnInit(): void {
    console.log('ngOnInit')
    this.quizDataEmitter$ = this.quizService.quizlist().pipe(map(x => {
      return x.data;
    }));
  }

  gotoQuizPage(QuestionId: string|null) {
    this.route.navigate(['/quiz', QuestionId]);
  }
}
