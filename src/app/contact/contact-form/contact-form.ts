import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactFormComponent {
  // Equivalent to React: props.headerTitle
  // Using modern signal inputs
  headerTitle = input<string>('Send a Message');

  // Equivalent to React: props.onFormSubmitCallback
  // Using modern signal outputs
  formSubmit = output<{ name: string; email: string; message: string }>();

  onSubmit(event: Event) {
    event.preventDefault();

    // Grab references to form inputs via DOM selectors for simplicity
    const form = event.target as HTMLFormElement;
    const name = (form.querySelector('#contact-name') as HTMLInputElement).value;
    const email = (form.querySelector('#contact-email') as HTMLInputElement).value;
    const message = (form.querySelector('#contact-msg') as HTMLTextAreaElement).value;

    // Emit event to parent (similar to calling a callback prop)
    this.formSubmit.emit({ name, email, message });
    form.reset();
  }
}
