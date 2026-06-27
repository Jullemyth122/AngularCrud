import { Component, OnInit, input, output, signal } from '@angular/core';

@Component({
  selector: 'create-item',
  standalone: true,
  templateUrl: './create-form.html',
  styleUrl: './create-form.scss',
})
export class CreateFormComponent implements OnInit {
  createItem = input<string>('Create A Item');

  formSubmit = output<{
    name: string;
    email: string;
    age: number;
    random_uid: string;
    location: string;
  }>();

  // Keep track of the currently generated UID
  generatedUid = signal<string>('');

  ngOnInit() {
    this.regenerateUid();
  }

  regenerateUid() {
    const randomPart = Math.random().toString(36).substring(2, 10);
    this.generatedUid.set(`uid-${randomPart}`);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    
    const name = (form.querySelector('#item-name') as HTMLInputElement).value;
    const email = (form.querySelector('#item-email') as HTMLInputElement).value;
    const age = Number((form.querySelector('#item-age') as HTMLInputElement).value);
    const location = (form.querySelector('#item-location') as HTMLInputElement).value;
    const random_uid = this.generatedUid();

    // Emit the output event to the parent
    this.formSubmit.emit({
      name,
      email,
      age,
      random_uid,
      location
    });

    // Reset the form and generate a new UID for the next entry
    form.reset();
    this.regenerateUid();
  }
}
