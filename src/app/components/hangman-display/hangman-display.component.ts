import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

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
  @Output() gameFinished = new EventEmitter<boolean>();

  Max_Mistakes = 7;
  mistakesRemaining !: number;
  success: boolean = false;

  constructor() {
    this.mistakesRemaining = this.Max_Mistakes;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const guessesCurrentValue = changes?.['guesses']?.currentValue;

    // Reset counter for new question
    if(guessesCurrentValue && 
      guessesCurrentValue.length == 0 && 
      guessesCurrentValue != changes?.['guesses']?.previousValue) 
    {
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
    let didWin = true;
    this.mistakesRemaining = this.mistakesRemaining - this.wasGuessAMistake(letter);
    //console.log('Guess: '+ letter + ' and Mistakes remaining: ' + this.mistakesRemaining);

    for (let i = 0; i < this.question.length; i++) {
      if (
        !this.guesses.find(
          (guess) => guess.toLowerCase() === this.question[i].toLowerCase()
        )
      ) {
        didWin = false;
        break;
      }
    }
    this.success = didWin;
    if (this.success || this.mistakesRemaining === 0) {
      this.gameFinished.emit(this.success);
    }
  }

  wasGuessAMistake(letter: string) {
    for (let i = 0; i < this.question.length; i++) {
      if (this.question[i].toLowerCase() === letter.toLowerCase()) {
        return 0;
      }
    }
    return 1;
  }

}
