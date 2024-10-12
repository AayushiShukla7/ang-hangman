import { Component, OnInit } from '@angular/core';
import { HangmanDisplayComponent } from '../hangman-display/hangman-display.component';
import { HangmanQuestionComponent } from '../hangman-question/hangman-question.component';
import { HangmanKeyboardComponent } from '../hangman-keyboard/hangman-keyboard.component';
import { HangmanService } from '../../services/hangman.service';

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [
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

  constructor(private hangmanService: HangmanService) {}

  ngOnInit(): void {
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
    console.log('Movie - ' + this.question);
    //this.question = this.question.split(" ").join("");  // remove empty spaces    

    // For test only
    this.question = "test this";
  }

}
