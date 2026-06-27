import { Component, signal } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form'; // Register child component here

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  // Maintain parent state for received data
  submissionData = signal<{ name: string; email: string; message: string } | null>(null);

  // Callback function triggered by the child's (formSubmit) output event
  onFormSubmitted(data: { name: string; email: string; message: string }) {
    this.submissionData.set(data);
  }
}
