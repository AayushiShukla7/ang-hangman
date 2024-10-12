import { Component, OnInit } from '@angular/core';
import { HangmanDisplayComponent } from '../hangman-display/hangman-display.component';
import { HangmanQuestionComponent } from '../hangman-question/hangman-question.component';
import { HangmanKeyboardComponent } from '../hangman-keyboard/hangman-keyboard.component';
import { HangmanService } from '../../services/hangman.service';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [
    CommonModule,
    HangmanDisplayComponent,
    HangmanQuestionComponent,
    HangmanKeyboardComponent
  ],
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.scss'
})
export class HangmanComponent implements OnInit{

  question: string = '';
  questions: string[] = [];
  guesses: string[] = [];
  category: string = '';
  showRestartGameBtn = false;

  constructor(private hangmanService: HangmanService, private location: Location) {}

  ngOnInit(): void {
    let jsonPath;
    const url = this.location.path();
    //console.log(url);

    if(url.includes('jsonPath')) {
      jsonPath = url.split('jsonPath=')[1];
      //console.log(jsonPath);
    }

    this.hangmanService.getQuestions()
      .subscribe((response) => {
        this.questions = response.items;
        this.category = response.category;

        this.pickNewQuestion();
      });
  }
  
  reset() {
    this.guesses = [];
    this.pickNewQuestion();
    this.showRestartGameBtn = false;
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
    // console.log('Movie - ' + this.question);
    //this.question = this.question.split(" ").join("");  // remove empty spaces  
  }

  onGameFinished() {
    this.showRestartGameBtn = true;
  }

}
