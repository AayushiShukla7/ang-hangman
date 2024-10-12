import { Component, OnInit } from '@angular/core';
import { HangmanDisplayComponent } from '../hangman-display/hangman-display.component';
import { HangmanQuestionComponent } from '../hangman-question/hangman-question.component';
import { HangmanKeyboardComponent } from '../hangman-keyboard/hangman-keyboard.component';
import { HangmanService } from '../../services/hangman.service';
import { CommonModule, Location } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HangmanDisplayComponent,
    HangmanQuestionComponent,
    HangmanKeyboardComponent,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.scss'
})
export class HangmanComponent implements OnInit {

  question: string = '';
  questions: string[] = [];
  guesses: string[] = [];
  category: string = '';
  showRestartGameBtn = false;
  selected = 'movies';
  newJsonPath = '';
  jsonPath: any;

  constructor(private hangmanService: HangmanService, private location: Location) {}

  ngOnInit(): void {    
    const url = this.location.path();

    if(url.includes('jsonPath')) {
      this.jsonPath = url.split('jsonPath=')[1];
    }  
    
    this.hangmanService.getQuestions(this.jsonPath)
      .subscribe((response) => {
        this.questions = response.items;
        this.category = response.category;

        this.pickNewQuestion();
      });
  }
  
  reset() {
    this.guesses = [];    
    this.showRestartGameBtn = false;
    this.selected = 'movies';
    this.newJsonPath = '';
    this.jsonPath = '/assets/movies.json';
    this.pickNewQuestion();
  }

  updateSource() {
    // User selected category
    if(this.jsonPath == undefined) this.jsonPath = '/assets/movies.json';

    this.newJsonPath = '/assets/'+this.selected+'.json';

    if(this.jsonPath !== undefined && this.jsonPath != this.newJsonPath) {
      this.hangmanService.getQuestions(this.newJsonPath)
      .subscribe((response) => {
        this.questions = response.items;
        this.category = response.category;

        this.pickNewQuestion();
      });
    }
  }

  guess(letter: string) {
    if(!letter || this.guesses.includes(letter)) {
      return;
    }
    this.guesses = [...this.guesses, letter];
  }

  dummyClick() {
    const key = prompt('Enter a key') || '';
    this.guess(key);
  }

  pickNewQuestion() {
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    this.question = this.questions[randomIndex];
    //console.log(this.category + ' - ' + this.question);
    //this.question = this.question.split(" ").join("");  // remove empty spaces  
  }

  onGameFinished() {
    this.showRestartGameBtn = true;
  }

}
