import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  // Equivalent to React: const [count, setCount] = useState(0)
  // Angular Signals are read by calling them as a function: count()
  count = signal<number>(0);

  // Equivalent to React: const doubleCount = useMemo(() => count * 2, [count])
  // Angular computed() is automatically memoized and tracks count() dependency
  doubleCount = computed(() => this.count() * 2);

  increment() {
    // To update a signal, you can use .update() or .set()
    this.count.update((current) => current + 1);
  }

  decrement() {
    this.count.update((current) => current - 1);
  }
}
