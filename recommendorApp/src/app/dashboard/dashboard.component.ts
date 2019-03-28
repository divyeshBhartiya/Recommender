import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RecommenderService} from '../recommender.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fetchedRecipes: any[];
  ratedValue = null;
  constructor(private authService: AuthService, private recommenderService: RecommenderService) { }

  ngOnInit() {
    setTimeout(() => {
      this.fetchedRecipes = this.recommenderService.fetchedResponse;
    }, 2000);
  }

  rateItem(recipeName) {
    console.log(this.ratedValue, recipeName);
    this.recommenderService.rateItem(recipeName, this.ratedValue, localStorage.getItem('userID'));
  }
}
