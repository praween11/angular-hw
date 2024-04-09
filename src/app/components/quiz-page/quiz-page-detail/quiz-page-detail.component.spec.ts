import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPageDetailComponent } from './quiz-page-detail.component';

describe('QuizPageDetailComponent', () => {
  let component: QuizPageDetailComponent;
  let fixture: ComponentFixture<QuizPageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizPageDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizPageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
