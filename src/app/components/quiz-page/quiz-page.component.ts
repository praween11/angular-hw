import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AnswerData, QuestionAnswerData, QuestionDetail, QuizDetail, QuizInfo } from '@app/models/quiz-data';
import { QuizService } from '@app/services/quiz.service';
import { QuizPageDetailComponent } from "./quiz-page-detail/quiz-page-detail.component";
import { Observable, Subscription, interval, map } from 'rxjs';

@Component({
    selector: 'app-quiz-page',
    standalone: true,
    templateUrl: './quiz-page.component.html',
    styleUrl: './quiz-page.component.css',
    imports: [CommonModule, QuizPageDetailComponent,AsyncPipe]
})
export class QuizPageComponent implements OnInit {
  quizInfo:QuizInfo | null = null;
  quizId:string | null | undefined = '';
  quizDetail:QuizDetail | null | undefined = null;
  answer:QuestionAnswerData = {
    questionCategoryId : '',
    questions: []
  }
  quizAnswer:AnswerData[] | null | undefined = [];
  display: any;
  timeUp: boolean = false;

  constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.quizService.quizById(id!).subscribe(data => {
      console.log(data);
      this.quizInfo = data?.data;
      this.quizId = this.quizInfo?.questionInfo![0].questionId;
      this.quizDetail = this.quizInfo?.questionInfo![0];
      this.answer.questionCategoryId = this.quizInfo?.questionCategoryId!;
      this.quizAnswer = this.answer.questions?.find(x => x.questionId == this.quizId)?.answers;
      this.countdownTimer(this.quizInfo?.timeLimitOfMinuteUnit!);
    });
  }

  countdownTimer(minute: number) {
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        clearInterval(timer);
        this.timeUp = true;
        interval(500).subscribe(() => {
          this.router.navigate(['/quiz-category'])
        });
      }
    }, 1000);
 }

  gotoQuiz(questionId: string | null){
    this.quizDetail = this.quizInfo?.questionInfo?.find(x => x.questionId == questionId);
    this.quizId = questionId;
    this.quizAnswer = this.answer.questions?.find(x => x.questionId == this.quizId)!.answers;
  }

  sendAnswerAndNext(answers: string[]){
    console.log(answers);
    this.answer.questions = this.answer.questions?.filter(x => x.questionId != this.quizId!);
    let ans = {questionId: this.quizId!, answers: new Array()};
    answers.forEach(answer => {
      ans.answers.push({questionAnswerId: answer});
    })
    this.answer.questions?.push(ans);
    console.log('this.answer');
    console.log(this.answer);
    this.nextQuiz();
  }

  previousQuiz(){
    let currentQuiz = this.quizInfo?.questionInfo?.find(x => x.questionId == this.quizId);
    if (currentQuiz?.sequence! > 1){
      this.quizDetail = this.quizInfo?.questionInfo?.find(x => x.sequence == currentQuiz?.sequence! - 1);
      this.quizId = this.quizDetail?.questionId;
      this.quizAnswer = this.answer.questions?.find(x => x.questionId == this.quizId)?.answers;
    }
  }

  nextQuiz(){
    let currentQuiz = this.quizInfo?.questionInfo?.find(x => x.questionId == this.quizId);
    if (this.quizInfo?.questionInfo?.find(x => x.sequence > currentQuiz?.sequence!) != null){
      this.quizDetail = this.quizInfo?.questionInfo?.find(x => x.sequence == currentQuiz?.sequence! + 1);
      this.quizId = this.quizDetail?.questionId;
      console.log('this.quizId = '+ this.quizId);
      this.quizAnswer = this.answer.questions?.find(x => x.questionId == this.quizId)?.answers;
      console.log('this.quizAnswer');
      console.log(this.quizAnswer);
    }
    else {
      this.sendAwswer();
    }
  }

  sendAwswer(){
    this.quizService.submitAwswer(this.answer).subscribe(data => {
      console.log(data);
      const navigationExtras: NavigationExtras = {
        state: {
          data: data
        }
      };
      this.router.navigate(['/summary'], navigationExtras);
    })
  }
}
