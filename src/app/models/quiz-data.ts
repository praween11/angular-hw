export class Quizs {
    quizList: QuizData[] | null;

    constructor(){
        this.quizList = [];
    }
}

export class QuizData {
    questionCategoryId: string | null;
    title: string | null;

    constructor(){
        this.questionCategoryId = '';
        this.title = ''
    }
}

export class QuizInfo {
    questionCategoryId: string | null;
    title: string | null;
    totalQuestion: number | 0;
    level: string | null;
    timeLimitOfMinuteUnit: number | 0;
    questionInfo: QuizDetail[] | null;

    constructor(){
        this.questionCategoryId = '';
        this.title = '';
        this.totalQuestion = 0;
        this.level = '';
        this.timeLimitOfMinuteUnit = 0;
        this.questionInfo = []; 
    }
}

export class QuizDetail {
    questionId: string | null | undefined;
    sequence: number | 0;
    title: string | 0;
    questionAnswerInfo: AnswerDetail[] | null;

    constructor() {
        this.questionId = '';
        this.sequence = 0;
        this.title = '';
        this.questionAnswerInfo = [];
    }
}

export class AnswerDetail {
    questionAnswerId: string | null;
    sequence: number | 0;
    answer: string | null;

    constructor() {
        this.questionAnswerId = '';
        this.sequence = 0;
        this.answer = '';
    }
}

export class QuestionAnswerData {
    questionCategoryId: string | null;
    questions: QuestionDetail[] | null | undefined;

    constructor() {
        this.questionCategoryId = '';
        this.questions = [];
    }
}

export class QuestionDetail {
    questionId: string | null;
    answers: AnswerData[] | null;
    constructor(){
        this.questionId = '';
        this.answers = [];
    }
}
export class AnswerData {
    questionAnswerId: string | null;
    constructor() {
        this.questionAnswerId = '';
    }
}
export class SummaryData {
    fullScore: number | null;
    score: number | null;
    constructor(){
        this.fullScore = 0;
        this.score = 0;
    }
}