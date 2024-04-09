import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, input, OnChanges, SimpleChanges } from '@angular/core';
import { AnswerData, QuestionAnswerData, QuizDetail } from '@app/models/quiz-data';

@Component({
  selector: 'app-quiz-page-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-page-detail.component.html',
  styleUrl: './quiz-page-detail.component.css'
})
export class QuizPageDetailComponent implements OnInit,OnChanges {
  answers: string[] = [];
  @Input() questionInfo: QuizDetail | null | undefined = null;
  @Input() answer:AnswerData[] | null | undefined = [];
  @Output() sendAnsEvent = new EventEmitter<string[]>();
  @Output() backQuizEvent = new EventEmitter();

  ngOnInit(): void {
    this.answer?.forEach(x => {
      this.answers.push(x.questionAnswerId!);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.answers = [];
    this.answer?.forEach(x => {
      this.answers.push(x.questionAnswerId!);
    });
  }
  nextQuiz(){
    this.sendAnsEvent.emit(this.answers);
  }

  previousQuiz(){
    this.backQuizEvent.emit();
  }

  onChange(answerId: any){
    this.answers = this.answers?.filter(x => x != answerId);
    this.answers.push(answerId);
  }
}
