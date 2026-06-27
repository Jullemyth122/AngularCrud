import { Component, input, output } from '@angular/core';

@Component({
  selector: 'delete-confirm',
  standalone: true,
  templateUrl: './delete-confirm.html',
  styleUrl: './delete-confirm.scss',
})
export class DeleteConfirmComponent {
  // The UID of the item to be deleted
  uid = input.required<string>();

  // Emits the UID when the user confirms deletion
  confirmed = output<string>();

  // Emits when the user cancels
  cancelled = output<void>();

  onConfirm() {
    this.confirmed.emit(this.uid());
  }

  onCancel() {
    this.cancelled.emit();
  }
}
