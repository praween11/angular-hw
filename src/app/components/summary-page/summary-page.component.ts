import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SummaryData } from '@app/models/quiz-data';

@Component({
  selector: 'app-summary-page',
  standalone: true,
  imports: [],
  templateUrl: './summary-page.component.html',
  styleUrl: './summary-page.component.css'
})
export class SummaryPageComponent implements OnInit {
  summeryData: SummaryData = new SummaryData();
  constructor(public route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    const currentState = this.router.lastSuccessfulNavigation;
    this.summeryData = currentState?.extras.state?.['data']['data'];
  }

  goCategory(){
    this.router.navigate(['/login']);
  }
}
