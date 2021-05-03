import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RootObject } from './model/data-modal';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  readonly API_URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium"

  constructor( private _http: HttpClient) { }

  quizData() {
 return this._http.get<RootObject>(this.API_URL);
  }
}
