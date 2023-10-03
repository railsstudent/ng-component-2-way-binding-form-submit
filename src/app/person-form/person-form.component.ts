import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [JsonPipe, FormsModule, NgIf],
  template: `
    <form #personForm="ngForm">
      <div>
        <label for="firstName">
          <span>First name: </span>
          <input id="firstName" name="firstName"
          [ngModel]="firstName"
          (ngModelChange)="updateFirstName($event, personForm.valid)" required
          #firstNameControl="ngModel"
           />
          <span class="error" *ngIf="firstNameControl.errors?.required && firstNameControl.dirty">First name is required</span>
        </label>
      </div>
      <div>
        <label for="lastName">
          <span>Last name: </span>
          <input id="lastName" name="lastName"
          [ngModel]="lastName" (ngModelChange)="updateLastName($event, personForm.valid)"
          #lastNameControl="ngModel"
          required  />
          <span class="error" *ngIf="lastNameControl.errors?.required && lastNameControl.dirty">Last name is required</span>
        </label>
      </div>
    </form>
    <pre>
      {{ personForm.valid }}
    </pre>
  `,
  styles: [`
    :host {
      display: block;
    }

    .error {
      color: red;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonFormComponent {
  @Input()
  firstName = '';

  @Output()
  firstNameChange = new EventEmitter<string>();
  
  @Input()
  lastName = '';

  @Output()
  lastNameChange = new EventEmitter<string>();
  
  @Output()
  formValid = new EventEmitter<boolean>();

  updateFormValid(isValid: boolean | null) {
    const isFormValid = isValid ? isValid : false;
    this.formValid.emit(isFormValid);
  }

  updateFirstName(value: string, isValid: boolean | null) {
    this.firstNameChange.emit(value);
    this.updateFormValid(isValid);
  }

  updateLastName(value: string, isValid: boolean | null) {
    this.lastNameChange.emit(value);
    this.updateFormValid(isValid);
  }
}
