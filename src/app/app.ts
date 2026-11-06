import { Component, signal, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  accumulator = signal<number>(0);
  operandInput = signal<string>('0');

  operand = computed(() => {
    const val = parseFloat(this.operandInput());
    return isNaN(val) ? 0 : val;
  });

  add() {
    this.accumulator.update((v) => v + this.operand());
  }

  subtract() {
    this.accumulator.update((v) => v - this.operand());
  }

  multiply() {
    this.accumulator.update((v) => v * this.operand());
  }

  divide() {
    const op = this.operand();
    if (op === 0) {
      alert('Cannot divide by zero');
      return;
    }
    this.accumulator.update((v) => v / op);
  }

  reset() {
    this.accumulator.set(0);
    this.operandInput.set('0');
  }
}
