import { Component, ElementRef, viewChild, signal, effect } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {
  name = signal<string>('World');

  // Equivalent to React: const myInput = useRef(null)
  // viewChild locates the element with #myInput in the template
  myInputRef = viewChild<ElementRef<HTMLInputElement>>('myInput');

  constructor() {
    // Equivalent to React: useEffect(() => { console.log("Name:", name) }, [name])
    // Angular effects must be created inside an injection context like the constructor.
    // It will run immediately once, and then re-run whenever 'name' changes.
    effect(() => {
      console.log(`[Angular Effect] The name signal changed to: "${this.name()}"`);
    });
  }

  updateName(newValue: string) {
    this.name.set(newValue);
  }

  focusInput() {
    // Access the raw DOM element and focus it
    const element = this.myInputRef()?.nativeElement;
    if (element) {
      element.focus();
      // Add a brief background animation to show it was focused
      element.style.backgroundColor = '#eff6ff';
      setTimeout(() => {
        element.style.backgroundColor = '';
      }, 300);
    }
  }
}
