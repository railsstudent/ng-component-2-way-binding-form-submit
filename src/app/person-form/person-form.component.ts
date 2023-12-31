import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../form-field/form-field.component';
import { USER_FORM_CONFIG } from './constants/user-form.config';
import { UserForm } from './interfaces/user-form.interface';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [FormFieldComponent, NgFor, ReactiveFormsModule],
  template: `
    <h3>Person Form</h3>
    <div class="form" [formGroup]="form">
      <app-form-field *ngFor="let key of keys; trackBy: trackFunction" [key]="key" [config]="configs[key]" />
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonFormComponent {  
  @Input({ required: true })
  userForm!: UserForm;

  @Output()
  userFormChange = new EventEmitter<UserForm>();

  @Output()
  isPersonFormValid = new EventEmitter<boolean>();

  form = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  })

  configs = USER_FORM_CONFIG;
  keys = Object.keys(this.configs);

  constructor() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((values) => {
        this.userForm = {
          firstName: values.firstName || '',
          lastName: values.lastName || '',
        };
        this.userFormChange.emit(this.userForm);
        this.isPersonFormValid.emit(this.form.valid);
      });
  }

  trackFunction(index: number, key: string) {
    return key;
  }
}
