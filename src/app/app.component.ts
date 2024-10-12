import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HangmanComponent } from './components/hangman/hangman.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HangmanComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ang-hangman';
}
