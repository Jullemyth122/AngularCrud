import { Component, OnInit, input, output, signal } from '@angular/core';
import { Item } from '../crud.service';

@Component({
  selector: 'update-form',
  standalone: true,
  templateUrl: './update-form.html',
  styleUrl: './update-form.scss',
})
export class UpdateFormComponent implements OnInit {
  // The item to be edited - required so the form pre-fills
  item = input.required<Item>();

  // Emits the fully updated item on save
  formSubmit = output<Item>();

  // Emits when the user clicks cancel
  cancelled = output<void>();

  // Local editable copies of each field as signals
  name = signal('');
  email = signal('');
  age = signal(0);
  location = signal('');

  ngOnInit() {
    // Pre-fill the form fields with the current item's values
    const i = this.item();
    this.name.set(i.name);
    this.email.set(i.email);
    this.age.set(i.age);
    this.location.set(i.location);
  }

  onSave(event: Event) {
    event.preventDefault();
    this.formSubmit.emit({
      random_uid: this.item().random_uid, // UID is read-only
      name: this.name(),
      email: this.email(),
      age: this.age(),
      location: this.location(),
    });
  }

  onCancel() {
    this.cancelled.emit();
  }
}
