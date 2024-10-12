import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hangman-question',
  standalone: true,
  imports: [],
  templateUrl: './hangman-question.component.html',
  styleUrl: './hangman-question.component.scss'
})
export class HangmanQuestionComponent implements OnChanges {

  @Input() question: string = '';
  @Input() guesses: string[] = [];
  characters: {value: string, guessed: boolean}[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const guessesCurrentValue = changes?.['guesses']?.currentValue;

    // Reset counter for new question
    if(guessesCurrentValue && guessesCurrentValue != changes?.['guesses']?.previousValue) {
      this.characters = this.question
        .split('')
        .map((char) => ({ value: char, guessed: false }));
    }

    if(guessesCurrentValue && 
      guessesCurrentValue.length > 0 && 
      guessesCurrentValue != changes?.['guesses']?.previousValue) 
    {
      const guessedChar = [...changes?.['guesses']?.currentValue].pop();

      this.characters = this.characters.map(char => {
        if(char.value.toLowerCase() === guessedChar.toLowerCase()) {
          return { ...char, guessed: true};
        }
        return char;
      });
    }
  }

}
