import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hangman-display',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './hangman-display.component.html',
  styleUrl: './hangman-display.component.scss'
})
export class HangmanDisplayComponent implements OnChanges {

  @Input() question: string = '';
  @Input() guesses: string[] = [];

  Max_Mistakes = 7;
  mistakesRemaining !: number;
  success: boolean = false;

  constructor() {
    this.mistakesRemaining = this.Max_Mistakes;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const guessesCurrentValue = changes?.['guesses']?.currentValue;

    // Reset counter for new question
    if(guessesCurrentValue && guessesCurrentValue != changes?.['guesses']?.previousValue) {
      this.mistakesRemaining = this.Max_Mistakes;
      this.success = false;
    }

    if(guessesCurrentValue && 
      guessesCurrentValue.length > 0 && 
      guessesCurrentValue != changes?.['guesses']?.previousValue) 
    {
      const char = [...guessesCurrentValue].pop();
      this.checkGuess(char);
    }
  }

  checkGuess(letter: string) {
    let isWinner = true;
    this.mistakesRemaining -= this.wasGuessAMistake(letter);
    console.log('Guess: '+ letter + ' and Mistakes remaining: ' + this.mistakesRemaining);

    for(let i = 0; i < this.question.length; i++) {
      if(!this.guesses.find(
        (g) => g.toLowerCase() === this.question[i].toLowerCase())) 
      {
        isWinner = false;
        break;
      }
    }

    this.success = isWinner;
    if(this.success || this.mistakesRemaining === 0) {
      console.log('Game Ended');
    }
  }

  wasGuessAMistake(letter: string) {
    let wasMistake = false;
    for(let i = 0; i < this.question.length; i++) {
      if(this.question[i].toLowerCase() === letter.toLowerCase()) {
        return 0;
      }
    }
    //const match = this.question.match(new RegExp(letter, 'gi'));  // Flag='gi' => Global & Case-Insensitive
    //return match ? 0 : 1;

    return 1;
  }

}
