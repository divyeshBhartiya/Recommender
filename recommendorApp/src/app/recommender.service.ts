import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/core/src/render3/util';

@Injectable({
  providedIn: 'root'
})
export class RecommenderService {
  recommendationSvcURL = 'http://127.0.0.1:5000/predictions/';
  rateSvcUrl = 'http://127.0.0.1:5000/rateItem/';
  fetchedResponse = [];
  constructor(private http: HttpClient) { }

  getRecommendations(uiid): any {
    localStorage.setItem('userID', uiid.toString());
    this.http.get(this.recommendationSvcURL + uiid).subscribe(
      (response: any[]) => this.fetchedResponse = response,
      (error: any) => console.log(error)
      );
  }

  rateItem(recipeName, ratedValue, uid): any {
    this.http.get(this.rateSvcUrl + recipeName + '/' + ratedValue + '/' + uid).subscribe(
      (response: any[]) => console.log(response),
      (error: any) => console.log(error)
      );
  }
}
