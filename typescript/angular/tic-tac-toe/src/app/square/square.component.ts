import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-square',
  template: `
    <button
      mat-flat-button
      color="{{ !value ? '' : value === 'X' ? 'primary' : 'accent' }}"
    >
      {{ value }}
    </button>
  `,
  styles: [
    'button { width: 100%; height: 100% !important; font-size: 5em !important; }',
  ],
  standalone: true,
  imports: [MatButtonModule, CommonModule],
})
export class SquareComponent {
  @Input() value: 'X' | 'O' | undefined;
}
