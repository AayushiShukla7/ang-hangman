import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hangman-display',
  standalone: true,
  imports: [],
  templateUrl: './hangman-display.component.html',
  styleUrl: './hangman-display.component.scss'
})
export class HangmanDisplayComponent implements OnChanges {

  @Input() question: string = '';
  @Input() guesses: string[] = [];

  Max_Mistakes = 7;
  mistakesRemaining !: number;

  constructor() {
    this.mistakesRemaining = this.Max_Mistakes;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const guessesCurrentValue = changes['guesses'].currentValue;

    if(guessesCurrentValue && 
      guessesCurrentValue.length > 0 && 
      guessesCurrentValue != changes['guesses'].previousValue) 
    {
      this.checkGuess(guessesCurrentValue[
        guessesCurrentValue.length - 1
      ]);
    }
  }

  checkGuess(letter: string) {
    console.log(letter);
  }

}
