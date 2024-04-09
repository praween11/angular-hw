import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { QuestionAnswerData, QuizData, QuizInfo, Quizs } from '@app/models/quiz-data';
import { AuthService } from './auth.service';
const QUIZ_API = "https://training-homework.calllab.net";
@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private client: HttpClient, private auth: AuthService) { }

  quizlist(){
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json"}),
    };
    return this.client.get<any>(QUIZ_API + '/v1/questions/categories', httpOptions);
  }

  quizById(id: string){
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json"}),
    };
    return this.client.get<any>(QUIZ_API + '/v1/questions/categories/' + id, httpOptions);
  }

  submitAwswer(data:QuestionAnswerData){
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json"}),
    };
    return this.client.post<any>(QUIZ_API + '/v1/questions/submit-assignment', data, httpOptions);
  }
}
