import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hangman-question',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './hangman-question.component.html',
  styleUrl: './hangman-question.component.scss'
})
export class HangmanQuestionComponent implements OnChanges {

  @Input() question: string = '';
  @Input() guesses: string[] = [];
  characters: {value: string, guessed: boolean}[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.['question']?.currentValue &&
      changes?.['question'].currentValue !== changes?.['question'].previousValue
    ) {
      this.characters = this.question
        .split('')
        .map((char) => ({ value: char, guessed: false }));
    }

    const guessesCurrentValue = changes?.['guesses']?.currentValue;
    
    if (
      guessesCurrentValue &&
      guessesCurrentValue.length &&
      guessesCurrentValue !== changes['guesses'].previousValue
    ) {
      const guessedChar = [...changes['guesses'].currentValue].pop();
      this.characters = this.characters.map((char) => {
        if (char.value.toLowerCase() === guessedChar.toLowerCase()) {
          return { ...char, guessed: true };
        }
        return char;
      });
    }
  }

}
