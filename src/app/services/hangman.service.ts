import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const defaultJSONPath = '/assets/movies.json';    //'../assets/fruits.json';

@Injectable({
  providedIn: 'root'
})
export class HangmanService {

  constructor(private http: HttpClient) { }

  getQuestions(jsonPath: string = defaultJSONPath) {
    return this.http.get<{category: string, items: string[]}>(jsonPath);
  }
}
