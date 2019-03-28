import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RecommenderService } from './recommender.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  userID: string;
  configURL = 'http://127.0.0.1:5000/createUser/';
  configGetUserURL = 'http://127.0.0.1:5000/getUser/';
  fetchedUser = [];

  constructor(private firebaseAuth: AngularFireAuth, private http: HttpClient,
    private recommender: RecommenderService) {
    this.user = this.firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then (value => {
      console.log('Success', value);
      this.createInternalUser(value.user.uid);
    }).catch(err => {
      console.log('Something went wrong: ', err.message);
    });
  }

  login(email: string, password: string) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then (value => {
      console.log(value.user.uid);
      this.getUser(value.user.uid);
      console.log(this.fetchedUser);
    }).catch(err => {
      console.log('Something went wrong: ', err.message);
    });
  }

  logout() {
    this.firebaseAuth.auth.signOut();
    localStorage.clear();
  }

  createInternalUser(uid: string) {
    this.http.get(this.configURL + '\'' + uid + '\'').subscribe(
      (response: any []) => console.log(response),
      (error) => console.log(error)
      );
  }

  getUser(uid: string) {
    this.http.get(this.configGetUserURL + '\'' + uid + '\'').subscribe(
      (response: any[]) => this.recommender.getRecommendations(response[0]), // this.userID = response[0]
      (error: any) => console.log(error)
      );
  }
}
